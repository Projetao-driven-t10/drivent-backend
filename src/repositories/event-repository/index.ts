import { prisma } from "@/config";
import { DEFAULT_EXP, redisClient } from "@/config/redis";
import { Event } from "@prisma/client";

async function findFirst(): Promise<Event> {
  const cacheKey = "getFirstEvent";
  const cachedEvent = await redisClient.get(cacheKey);
  if (cachedEvent) return JSON.parse(cachedEvent);
  else {
    const event = await prisma.event.findFirst();
    redisClient.setEx(cacheKey, DEFAULT_EXP, JSON.stringify(event));
    return event;
  }
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
