import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { ApolloServer, PubSub } from "apollo-server-express";
import * as Express from "express";
import genSchema from "./utils/genSchema";
import { formatValidationError } from "./utils/formatValidationError";
import "dotenv/config";

const webSocketOptions = {
	path: "/subscriptions",
	onConnect: () => {
		console.log("GraphQL Subscription connected!");
	},
	onDisconnect: () => {
		console.log("GraphQL Subscription disconnected!");
	},
};

export const startServer = async () => {
	const connectionOptions = await getConnectionOptions("development");
	await createConnection({ ...connectionOptions, name: "default" });

	const pubSub = new PubSub();

	const apolloServer = new ApolloServer({
		schema: await genSchema(),
		playground: true,
		introspection: true,
		subscriptions: webSocketOptions,
		formatError: formatValidationError,
		context: ({}) => ({
			pubSub,
		}),
	});

	const app = Express();

	apolloServer.applyMiddleware({ app });
	const PORT = process.env.PORT ? process.env.PORT : 4000;
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
};
