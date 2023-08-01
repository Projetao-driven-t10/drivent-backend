import { prisma } from "@/config";
import { DEFAULT_EXP, redisClient } from "@/config/redis";

async function findHotels() {
  const cacheKey = "getAllHotels";
  const cachedHotels = await redisClient.get(cacheKey);
 
  if (cachedHotels) {
    return JSON.parse(cachedHotels);
  } else {
    const hotels = await prisma.hotel.findMany();
    redisClient.setEx(cacheKey, DEFAULT_EXP, JSON.stringify(hotels));
    return hotels;
  }
}

async function findRoomsByHotelId(hotelId: number) {  
  const cacheKey = `hotelrooms=${hotelId}`;
  const cachedrooms = await redisClient.get(cacheKey);
  if (cachedrooms) {
    return JSON.parse(cachedrooms);  
  } else {
    const rooms = await prisma.room.findMany({
      where: {
        hotelId,
      },
    });
    redisClient.setEx(cacheKey, DEFAULT_EXP, JSON.stringify(rooms));
    return rooms;  
  }
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
};

export default hotelRepository;
