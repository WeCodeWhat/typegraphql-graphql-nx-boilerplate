import {
	Arg,
	Resolver,
	Mutation,
	Query,
	Ctx,
	UseMiddleware,
} from "type-graphql";
import { Error as ErrorSchema } from "../../common/error.schema";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Room } from "../../../entity/Room";
import { RoomRepository } from "../../repos/RoomRepo";
import { isAuth } from "../../middleware/isAuth";
import { GQLContext } from "../../../utils/graphql-utils";
import { UserRepository } from "../../repos/UserRepo";
import { AddNewRoomInput } from "./RoomCRUD.input";

@Resolver((of) => Room)
class RoomCRUDResolver {
	@InjectRepository(RoomRepository)
	private readonly roomRepository: RoomRepository;
	@InjectRepository(UserRepository)
	private readonly userRepository: UserRepository;

	@UseMiddleware(isAuth)
	@Mutation(() => ErrorSchema!, { nullable: true })
	async addNewRoom(
		@Arg("data") { name }: AddNewRoomInput, //TODO
		@Ctx() { session }: GQLContext
	) {
		const room = await this.roomRepository.find({ where: { name } });
		if (room.length > 0) {
			return {
				path: "name",
				message: "This room has been created",
			};
		}
		const user = await this.userRepository.findOne({
			where: { id: session.userId },
		});
		this.roomRepository
			.create({
				name,
				owner: user,
			})
			.save();

		return null;
	}
}

export default RoomCRUDResolver;
