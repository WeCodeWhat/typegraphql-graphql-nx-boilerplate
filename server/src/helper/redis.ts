import * as Redis from "ioredis";
import * as connectRedis from "connect-redis";
import { REDIS_SESSION_PREFIX } from "../constants/global-variables";
import { RedisPubSub } from "graphql-redis-subscriptions";

export const redis = new Redis({
	port: 6379, // Redis port
	host: "127.0.0.1", // Redis host
	retryStrategy: (times) => {
		// reconnect after
		return Math.min(times * 50, 2000);
	},
});

export const redisPubSub = new RedisPubSub({
	publisher: redis,
	subscriber: redis,
});

export const initializeRedisStore = (session: any): connectRedis.RedisStore => {
	const RedisStore = connectRedis(session);

	return new RedisStore({ client: redis, prefix: REDIS_SESSION_PREFIX });
};
