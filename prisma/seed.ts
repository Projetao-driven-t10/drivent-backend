import { Hotel, PrismaClient, Room, TicketType } from "@prisma/client";
import { seedEvent, seedHotel, seedRoom, seedTicketType } from "./seedFunctions";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  let ticketType: TicketType[] | TicketType | null = await prisma.ticketType.findFirst();
  let hotel: Hotel[] = await prisma.hotel.findMany();
  let room: Room[] = await prisma.room.findMany();

  if (!event) event = await seedEvent()
  console.log(event)

  if (!ticketType) ticketType = await seedTicketType()
  console.log(ticketType)

  if (hotel.length === 0) hotel = await seedHotel();
  console.log(hotel)

  if (room.length === 0) hotel.forEach(async (hostel) =>{
    await seedRoom(hostel.id)
    console.log("seeded Rooms of hotel: "+hostel.id)
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

