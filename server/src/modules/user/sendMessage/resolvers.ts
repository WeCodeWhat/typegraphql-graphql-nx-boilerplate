import {
	Resolver,
	Field,
	Args,
	ArgsType,
	createUnionType,
	Mutation,
} from "type-graphql";
import { User } from "../../../entity/User";
import { Error as ErrorSchema } from "../../common/error.schema";
import { User as UserSchema } from "../../common/user.schema";

@ArgsType()
class MessageArgs {
	@Field(() => String)
	senderId: string;

	@Field(() => String)
	roomId: string;

	@Field(() => String)
	message: string;

	@Field(() => String, { defaultValue: new Date().getUTCDate() })
	date: string;
}

const SendMessageUnionType = createUnionType({
	name: "SendMessageResult",
	types: () => [ErrorSchema, UserSchema] as const,
});

@Resolver()
export default class {
	@Mutation(() => SendMessageUnionType)
	async sendMessage(@Args() { message, roomId, senderId, date }: MessageArgs) {
		if (!roomId)
			return {
				path: "roomId",
				message: ErrorMessage.roomIsNotExist,
			};
		const user = await User.findOne(senderId);
		if (!user)
			return {
				path: "senderId",
				message: ErrorMessage.userIsNotExist,
			};

		return {
			id: "123456789",
			message,
			sender: {
				...user,
			},
			date,
		};
	}
}
