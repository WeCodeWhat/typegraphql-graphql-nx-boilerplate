import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import RegisterResolver from "../modules/user/register/RegisterResolver";
import LoginResolver from "../modules/user/login/LoginResolver";
import SendMessageResolver from "../modules/chat/sendMessage/SendMessageResolver";

const genSchema = async (): Promise<GraphQLSchema> => {
	const schema = await buildSchema({
		resolvers: [RegisterResolver, LoginResolver, SendMessageResolver],
		container: Container,
	});

	return schema;
};

export default genSchema;
