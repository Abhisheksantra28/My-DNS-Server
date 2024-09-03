const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// Connect to Redis
redis.on("connect", () => {
  console.log("Connected to Redis");
});

// Handle Redis errors
redis.on("error", (err) => {
  console.error("Redis error:", err);
  process.exit(1);
});

module.exports = redis;
