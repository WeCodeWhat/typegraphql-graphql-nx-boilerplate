import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class AddNewRoomInput {
	@Field()
	@Length(1, 50)
	name: string;
}
