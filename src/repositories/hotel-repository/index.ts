import { prisma } from "@/config";
import { getOrSetCache } from "@/utils/redis-utils";

async function findHotels() {
  const hotels = await getOrSetCache("getAllHotels", async () => {
    const allHotels = await prisma.hotel.findMany();
    return allHotels;
  });
  return hotels;
}

async function findRoomsByHotelId(hotelId: number) {
  const rooms = await getOrSetCache(`hotelrooms=${hotelId}`, async () => {
    const getRooms = await prisma.room.findMany({
      where: {
        hotelId,
      },
    });
    return getRooms;
  });
  return rooms;
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
};

export default hotelRepository;
