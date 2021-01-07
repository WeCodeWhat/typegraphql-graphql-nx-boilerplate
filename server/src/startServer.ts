import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import genSchema from "./utils/genSchema";

export const startServer = async () => {
	await createConnection();

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
