import { Field, ObjectType } from "type-graphql";
import { Chat } from "../../entity/Chat";

@ObjectType("ChatPayload")
export class ChatPayload {
	@Field(() => Chat!)
	chat: Chat;

	@Field(() => String!)
	roomId: string;
}
