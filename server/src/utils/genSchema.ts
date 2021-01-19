import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import RegisterResolver from "../modules/user/register/RegisterResolver";

const genSchema = async (): Promise<GraphQLSchema> => {
	const schema = await buildSchema({
		resolvers: [RegisterResolver],
		container: Container,
	});

	return schema;
};

export default genSchema;
