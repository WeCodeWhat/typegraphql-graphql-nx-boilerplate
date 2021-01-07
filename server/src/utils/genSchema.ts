import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import RegisterResolver from "../modules/user/register/resolvers";

const genSchema = async (): Promise<GraphQLSchema> => {
	const schema = await buildSchema({
		resolvers: [RegisterResolver],
	});

	return schema;
};

export default genSchema;
