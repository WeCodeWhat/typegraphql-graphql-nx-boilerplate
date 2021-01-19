import {
	Arg,
	Resolver,
	Mutation,
	PubSub,
	Subscription,
	Root,
	Publisher,
} from "type-graphql";
import { User } from "../../../entity/User";
import { ChatRepository } from "../../repos/ChatRepo";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Chat } from "../../../entity/Chat";
import { SendMessageInput } from "./SendMessageInput";
import { RoomRepository } from "../../repos/RoomRepo";
import { Error as ErrorSchema } from "../../common/error.schema";
import { ErrorMessage } from "./ErrorMessage";
import { Room } from "../../../entity/Room";

enum SubTopic {
	NEW_ROOM_MESSAGE_ADDED = "NEW_ROOM_MESSAGE_ADDED",
}
interface ChatPayload {
	room: Room;
}
@Resolver((of) => User)
class SendMessageResolver {
	@InjectRepository(ChatRepository)
	private readonly chatRepository: ChatRepository;
	@InjectRepository(RoomRepository)
	private readonly roomRepository: RoomRepository;

	@Subscription({
		topics: SubTopic.NEW_ROOM_MESSAGE_ADDED,
		filter: ({ payload, args }) => args.priorities.includes(payload.priority),
	})
	newRoomMessageAdded(@Root() chatPayload: ChatPayload): Room {
		return chatPayload.room;
	}

	@Mutation(() => ErrorSchema!)
	async sendMessage(
		@Arg("data") { message, roomId }: SendMessageInput,
		@PubSub(SubTopic.NEW_ROOM_MESSAGE_ADDED) publish: Publisher<ChatPayload>
	) {
		const room = await this.roomRepository.findOne({
			where: { id: roomId },
		});
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
		room?.history.push(chatMessage);
		await publish({ room }).catch((err) => console.log(err));
		return null;
	}
}

export default SendMessageResolver;
