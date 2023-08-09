import { prisma } from "@/config";
import { getOrSetCache } from "@/utils/redis-utils";

async function findHotels() {
  const hotels = await getOrSetCache("getAllHotels", async () => {
    const allHotels = await prisma.hotel.findMany({
      include: {
        Rooms: true,
      }
    });
    return allHotels;
  });
  return hotels;
}

async function findRoomsByHotelId(hotelId: number) {
  const rooms = await getOrSetCache(`hotelroom${hotelId}`, async () => {
    const getRooms = await prisma.hotel.findFirst({
      where: {
        id: hotelId,
      },
      include: {
        Rooms: true,
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
