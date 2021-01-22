import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import * as path from "path";

const genSchema = async (): Promise<GraphQLSchema> => {
	const modulePath = "../modules/**/*.resolver.ts";
	const schema = await buildSchema({
		resolvers: [path.join(__dirname, modulePath)],
		container: Container,
	});

	return schema;
};

export default genSchema;
