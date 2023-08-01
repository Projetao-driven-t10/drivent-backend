import { redisClient } from "@/config/redis";
import { Hotel } from "@prisma/client";
import { RedisCommandArgument } from "@redis/client/dist/lib/commands";

interface Callback {
  ():   Hotel[] | Event;
}
interface MyFunc {
  (key: RedisCommandArgument, cb: Callback):  Promise<Hotel[] | Event>;
}

//TODO implementar codigo em event repository e hotel repository
export const getOrSetCache: MyFunc = (key, cb: Callback) => {
  const EXPIRATION_TIME = 300;
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const data = await redisClient.get(key);
      if (data != null) {
        resolve(JSON.parse(data));
      } else {
        const freshData = await cb();
        await redisClient.setEx(key, EXPIRATION_TIME, JSON.stringify(freshData));
        resolve(freshData);
      }
    } catch (error) {
      reject(error);
    }
  });
};
