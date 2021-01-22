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
import { GQLPlaygroundConfig } from "./config/GQLPlayground.config";
import { EnvironmentType } from "./utils/environmentType";

export const startServer = async () => {
	if (process.env.NODE_ENV !== EnvironmentType.PROD) {
		await redis.flushall();
	}
	const connectionOptions = await getConnectionOptions("development");
	await createConnection({ ...connectionOptions, name: "default" });

	const pubSub = new PubSub();

	const apolloServer = new ApolloServer({
		schema: await genSchema(),
		playground: {
			settings: GQLPlaygroundConfig,
		},
		introspection: true,
		subscriptions: {
			onConnect: () => console.log("GraphQL Subscription Server connected!"),
			onDisconnect: () =>
				console.log("GraphQL Subscription Server disconnected!"),
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
	const httpServer = http.createServer(app);
	apolloServer.applyMiddleware({ app, cors: corsOptions });
	apolloServer.installSubscriptionHandlers(httpServer);

	const PORT = process.env.PORT || 5000;
	httpServer.listen(PORT, () => {
		console.log(
			`Server is ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
		);
		console.log(
			`Subscription Server is ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
		);
	});
};
