import {
	Arg,
	Resolver,
	Mutation,
	Query,
	PubSub,
	PubSubEngine,
	Subscription,
} from "type-graphql";
import { User } from "../../../entity/User";
// import { UserRepository } from "../../repos/UserRepo";
import { ChatRepository } from "../../repos/ChatRepo";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Chat } from "../../../entity/Chat";
import { SendMessageInput } from "./SendMessageInput";
import { RoomRepository } from "../../repos/RoomRepo";
import { Error as ErrorSchema } from "../../common/error.schema";
import { ErrorMessage } from "./ErrorMessage";

enum SubTopic {
	NEW_ROOM_MESSAGE_ADDED = "NEW_ROOM_MESSAGE_ADDED",
}
@Resolver((of) => User)
class SendMessageResolver {
	// @InjectRepository(UserRepository)
	// private readonly userRepository: UserRepository;
	@InjectRepository(ChatRepository)
	private readonly chatRepository: ChatRepository;
	@InjectRepository(RoomRepository)
	private readonly roomRepository: RoomRepository;

	@Subscription({
		topics: SubTopic.NEW_ROOM_MESSAGE_ADDED,
		filter: ({ payload, args }) => args.priorities.includes(payload.priority),
	})
	newRoomMessageAdded(): any {}

	@Mutation(() => ErrorSchema!)
	async sendMessage(
		@Arg("data") { message, roomId }: SendMessageInput,
		@PubSub() pubSub: PubSubEngine
	) {
		const room = await this.roomRepository.findOne({ where: { id: roomId } });
		if (!room) {
			return {
				path: "roomId",
				message: ErrorMessage.roomIdIsNotValid,
			};
		}
		const chatMessage = await this.chatRepository
			.create({ message, sender: {} })
			.save();
		console.log(chatMessage);
		room.history.push(chatMessage);
		const payload: Chat = chatMessage;
		await pubSub
			.publish(SubTopic.NEW_ROOM_MESSAGE_ADDED, payload)
			.catch((err) => console.log(err));
		return null;
	}
}

export default SendMessageResolver;
