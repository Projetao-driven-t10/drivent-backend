import { createClient } from "redis";

export const DEFAULT_EXP = 30; // seconds

const redisClient = createClient({
  url: process.env.REDIS_URL
});

(async () => {
  // eslint-disable-next-line no-console
  console.log("connecting redis...");
  await redisClient.connect();
})();

export { redisClient };
