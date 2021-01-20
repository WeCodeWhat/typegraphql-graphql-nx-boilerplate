import "reflect-metadata";
import "dotenv/config";
import { createConnection, getConnectionOptions } from "typeorm";
import { ApolloServer, PubSub } from "apollo-server-express";
import * as Express from "express";
import genSchema from "./utils/genSchema";
import * as http from "http";
import { formatValidationError } from "./utils/formatValidationError";
import { sessionConfiguration } from "./helper/session";
import { GQLContext } from "./utils/graphql-utils";
import { redis } from "./helper/redis";
import { DEV_BASE_URL } from "./constants/global-variables";

export const startServer = async () => {
	await redis.flushall();
	const connectionOptions = await getConnectionOptions("development");
	await createConnection({ ...connectionOptions, name: "default" });

	const pubSub = new PubSub();
	const schemas = await genSchema();

	const apolloServer = new ApolloServer({
		schema: schemas,
		playground: true,
		introspection: true,
		subscriptions: {
			onConnect: () => console.log("GraphQL Subscription connected!"),
			onDisconnect: () => console.log("GraphQL Subscription disconnected!"),
		},
		formatError: formatValidationError,
		context: ({ req }: GQLContext) => ({
			req,
			redis,
			pubSub,
			session: req.session,
			url: req.protocol + "://" + req.get("host"),
		}),
	});

	const corsOptions = { credentials: true, origin: DEV_BASE_URL };

	const app = Express();
	app.use(sessionConfiguration);
	apolloServer.applyMiddleware({ app, cors: corsOptions });

	const httpServer = http.createServer(app);
	apolloServer.installSubscriptionHandlers(httpServer);

	const PORT = process.env.PORT ? process.env.PORT : 4000;
	httpServer.listen(PORT, () => {
		console.log(
			`server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
		);
		console.log(
			`Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
		);
	});
};
