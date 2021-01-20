import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import RegisterResolver from "../modules/user/register/RegisterResolver";
import LoginResolver from "../modules/user/login/LoginResolver";
import SendMessageResolver from "../modules/chat/sendMessage/SendMessageResolver";
import RoomCRUDResolver from "../modules/room/crud/RoomCRUDResolver";

const genSchema = async (): Promise<GraphQLSchema> => {
	const schema = await buildSchema({
		resolvers: [
			RegisterResolver,
			LoginResolver,
			SendMessageResolver,
			RoomCRUDResolver,
		],
		container: Container,
	});

	return schema;
};

export default genSchema;
