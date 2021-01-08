import { Field, ID, ObjectType } from "type-graphql";
import { User as UserSchema } from "./user.schema";

@ObjectType()
export class Chat {
	@Field(() => ID)
	id: string;
	@Field(() => UserSchema!)
	sender: UserSchema;
	@Field(() => String!)
	message: string;
	@Field(() => String!)
	date: string;
}
