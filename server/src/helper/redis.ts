import * as Redis from "ioredis";
import * as connectRedis from "connect-redis";
import { REDIS_SESSION_PREFIX } from "../constants/global-variables";
import { RedisPubSub } from "graphql-redis-subscriptions";

export class REDIS {
	private readonly config: Redis.RedisOptions = {
		port: 6379, // Redis port
		host: "127.0.0.1", // Redis host
		retryStrategy: (times) => {
			// reconnect after
			return Math.min(times * 50, 2000);
		},
	};
	public server = new Redis(this.config);
	client = new Redis(this.config);
}

export const redisPubSub = new RedisPubSub({
	publisher: new REDIS().server,
	subscriber: new REDIS().client,
});

export const initializeRedisStore = (session: any): connectRedis.RedisStore => {
	const RedisStore = connectRedis(session);

	return new RedisStore({
		client: new REDIS().server,
		prefix: REDIS_SESSION_PREFIX,
	});
};
