import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

//Seed Activity ------------------------- Seed Activity
export async function seedActivity() {
    return await prisma.activity.create({
      data: {
        day: "2024-01-25T00:00:01.000Z",
        start: "2024-01-25T16:00:00.000Z",
        end: "2024-01-25T22:00:00.000Z",
        name: "Minecraft dos CRIA",
        place: "Esquina da barraca de pastel do seu Joacir",
        vacancies: 10
      },
    });
  }

seedActivity()