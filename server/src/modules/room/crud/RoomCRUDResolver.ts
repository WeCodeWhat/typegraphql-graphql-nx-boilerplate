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

@Resolver((of) => Room)
class RoomCRUDResolver {
	@InjectRepository(RoomRepository)
	private readonly roomRepository: RoomRepository;
	@InjectRepository(UserRepository)
	private readonly userRepository: UserRepository;

	@UseMiddleware(isAuth)
	@Mutation(() => ErrorSchema!, { nullable: true })
	async addNewRoom(
		@Arg("data") { name }: Room, //TODO
		@Ctx() { session }: GQLContext
	) {
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
