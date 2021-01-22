import { IsEmail, IsUUID, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { ErrorMessage } from "./ErrorMessage";

@InputType()
export class SendMessageInput {
	@Field()
	@IsUUID(4, { message: ErrorMessage.roomIdIsNotValid })
	roomId: string;

	@Field()
	message: string;
}
