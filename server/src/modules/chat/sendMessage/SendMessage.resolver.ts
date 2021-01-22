import {
	Arg,
	Resolver,
	Mutation,
	PubSub,
	Subscription,
	Root,
	Publisher,
	UseMiddleware,
	Ctx,
	PubSubEngine,
} from "type-graphql";
import { ChatRepository } from "../../repos/ChatRepo";
import { InjectRepository } from "typeorm-typedi-extensions";
import { SendMessageInput } from "./SendMessage.input";
import { RoomRepository } from "../../repos/RoomRepo";
import { Error as ErrorSchema } from "../../common/error.schema";
import { ErrorMessage } from "./ErrorMessage";
import { ChatPayload } from "../../common/chatPayload.schema";
import { Chat } from "../../../entity/Chat";
import { isAuth } from "../../middleware/isAuth";
import { GQLContext } from "../../../utils/graphql-utils";
import { UserRepository } from "../../repos/UserRepo";

enum SubTopic {
	NEW_ROOM_MESSAGE_ADDED = "NEW_ROOM_MESSAGE_ADDED",
}

@Resolver((of) => Chat)
class SendMessageResolver {
	@InjectRepository(ChatRepository)
	private readonly chatRepository: ChatRepository;
	@InjectRepository(RoomRepository)
	private readonly roomRepository: RoomRepository;
	@InjectRepository(UserRepository)
	private readonly userRepository: UserRepository;

	@Subscription({
		topics: SubTopic.NEW_ROOM_MESSAGE_ADDED,
		// filter: ({ payload, args }) => args.roomId === payload.roomId,
	})
	newRoomMessageAdded(@Root() chatPayload: ChatPayload): ChatPayload {
		console.log(chatPayload);
		return chatPayload;
	}

	@UseMiddleware(isAuth)
	@Mutation(() => ErrorSchema!, { nullable: true })
	async sendMessage(
		@Arg("data") { message, roomId }: SendMessageInput,
		@PubSub() pubSub: PubSubEngine,
		@Ctx() { session }: GQLContext
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
		const users = await this.userRepository.find({
			where: { id: session.userId },
		});
		const chatMessage = await this.chatRepository
			.create({ message, sender: users[0], room })
			.save();
		console.log(chatMessage);
		if (room.messages) {
			room.messages.push(chatMessage);
		} else {
			const chats: Chat[] = [];
			chats.push(chatMessage);
			room.messages = chats;
		}
		room.save();
		await pubSub
			.publish(SubTopic.NEW_ROOM_MESSAGE_ADDED, {
				chat: chatMessage,
				roomId: room.id,
			})
			.catch((err) => console.log(err));
		return null;
	}
}

export default SendMessageResolver;
