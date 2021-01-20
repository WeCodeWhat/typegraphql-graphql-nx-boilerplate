import {
	Arg,
	Resolver,
	Mutation,
	PubSub,
	Subscription,
	Root,
	Publisher,
	UseMiddleware,
} from "type-graphql";
import { ChatRepository } from "../../repos/ChatRepo";
import { InjectRepository } from "typeorm-typedi-extensions";
import { SendMessageInput } from "./SendMessageInput";
import { RoomRepository } from "../../repos/RoomRepo";
import { Error as ErrorSchema } from "../../common/error.schema";
import { ErrorMessage } from "./ErrorMessage";
import { ChatPayload } from "../../common/chatPayload.schema";
import { Chat } from "../../../entity/Chat";
import { isAuth } from "../../middleware/isAuth";

enum SubTopic {
	NEW_ROOM_MESSAGE_ADDED = "NEW_ROOM_MESSAGE_ADDED",
}

@Resolver((of) => Chat)
class SendMessageResolver {
	@InjectRepository(ChatRepository)
	private readonly chatRepository: ChatRepository;
	@InjectRepository(RoomRepository)
	private readonly roomRepository: RoomRepository;

	@Subscription({
		topics: SubTopic.NEW_ROOM_MESSAGE_ADDED,
		// filter: ({ payload, args }) => args.roomId === payload.roomId,
	})
	newRoomMessageAdded(@Root() chatPayload: ChatPayload): ChatPayload {
		return chatPayload;
	}

	@UseMiddleware(isAuth)
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
		await publish({ chat: chatMessage, roomId: room.id }).catch((err) =>
			console.log(err)
		);
		return null;
	}
}

export default SendMessageResolver;
