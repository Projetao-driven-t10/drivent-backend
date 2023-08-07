import { redisClient } from "@/config/redis";
import { Hotel, Room, Event } from "@prisma/client";
import { RedisCommandArgument } from "@redis/client/dist/lib/commands";

interface Callback {
  (): Promise<Event | Hotel[] | Room[] | Hotel & {
    Rooms: Room[]
  }>;
}
interface MyFunc {
  (key: RedisCommandArgument, cb: Callback): Promise< Event | Hotel[] | Room[] | Hotel & {
    Rooms: Room[]
  }>;
}

export const getOrSetCache: MyFunc = async (key, cb: Callback) => {
  const EXPIRATION_TIME = 300;
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const data = await redisClient.get(key);
      if (data != null) {
        resolve(JSON.parse(data));
      } else {
        const freshData = await cb() as Hotel & {
          Rooms: Room[]
        };
        await redisClient.setEx(key, EXPIRATION_TIME, JSON.stringify(freshData));
        resolve(freshData);
      }
    } catch (error) {
      reject(error);
    }
  });
};
