import { PrismaClient, TicketType } from "@prisma/client"

const prisma = new PrismaClient

  //Seed Ticket ------------------------ Seed Ticket
export async function seedTicketType() {
    const arr:TicketType[] = []
    arr.push(await prisma.ticketType.create({
      data: {
        name: "Seeded Ticket 1",
        includesHotel: false,
        isRemote: true,
        price: 30
      },
    }))
    arr.push(await prisma.ticketType.create({
      data: {
        name: "Seeded Ticket 2",
        includesHotel: true,
        isRemote: false,
        price: 300
      },
    }))
    return arr
  }
