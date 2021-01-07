import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import genSchema from "./utils/genSchema";
import "dotenv/config";

export const startServer = async () => {
	const connectionOptions = await getConnectionOptions("development");
	await createConnection({ ...connectionOptions, name: "default" });

	const apolloServer = new ApolloServer({
		schema: await genSchema(),
		playground: true,
		introspection: true,
	});

	const app = Express();

	apolloServer.applyMiddleware({ app });
	const PORT = process.env.PORT ? process.env.PORT : 4000;
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
};
