import { prisma } from "@/config";
import { getOrSetCache } from "@/utils/redis-utils";
import { Event } from "@prisma/client";

async function findFirst(): Promise<Event> {
  const event = await getOrSetCache("event", async () => {
    const getEvent = await prisma.event.findFirst();
    return getEvent;
  });
  return event as Event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
