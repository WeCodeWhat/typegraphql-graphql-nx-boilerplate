import { GraphQLSchema } from "graphql";
import { buildSchemaSync } from "type-graphql";
import { UserResolver } from "../modules/user/register/resolvers";
// import * as glob from "glob";

const genSchema = async (): Promise<GraphQLSchema> => {
	const schema = await buildSchemaSync({
		resolvers: [UserResolver],
	});

	return schema;
};

export default genSchema;
