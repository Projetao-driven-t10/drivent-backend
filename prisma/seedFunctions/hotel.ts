import { PrismaClient, Hotel } from "@prisma/client"

const prisma = new PrismaClient

  //Seed Hotel ------------------------- Seed Hotel
export async function seedHotel() {
    const arr:Hotel[] = []
    arr.push(await prisma.hotel.create({
      data: {
        name: "Seeded Hotel 1",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcl7wnKXlkPujvGtuCFKDJgMrbocSfVqJURg&usqp=CAU",
      },
    }))
    arr.push(await prisma.hotel.create({
      data: {
        name: "Seeded Hotel 2",
        image: "https://forbes.com.br/wp-content/uploads/2021/05/2_Life_Hotel-Gramado-Colline-de-France_26maio2021_Divulgacao-768x512.jpg",
      },
    }))
    return arr
  }
