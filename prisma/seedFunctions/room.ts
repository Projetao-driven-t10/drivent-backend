import { PrismaClient, Room } from "@prisma/client"

const prisma = new PrismaClient
//Seed Room ------------------------- Seed Room
export async function seedRoom(hotelId:number) {
    const arr:Room[] = []
    arr.push(await prisma.room.create({
      data: {
        name: "101",
        capacity: 2,
        hotelId
      },
    }))
    arr.push(await prisma.room.create({
      data: {
        name: "102",
        capacity: 1,
        hotelId
      },
    }))
    arr.push(await prisma.room.create({
      data: {
        name: "103",
        capacity: 2,
        hotelId
      },
    }))
    arr.push(await prisma.room.create({
      data: {
        name: "104",
        capacity: 1,
        hotelId
      },
    }))
    arr.push(await prisma.room.create({
      data: {
        name: "402",
        capacity: 4,
        hotelId
      },
    }))
    return arr
  }