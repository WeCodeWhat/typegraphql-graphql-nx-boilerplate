import { Arg, Resolver, Mutation, Query, Ctx } from "type-graphql";
import { Error as ErrorSchema } from "../../common/error.schema";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Room } from "../../../entity/Room";
import { RoomRepository } from "../../repos/RoomRepo";

@Resolver((of) => Room)
class RegisterResolver {
	@InjectRepository(RoomRepository)
	private readonly roomRepository: RoomRepository;

	@Query(() => String)
	hello() {
		return "Hello World";
	}

	@Mutation(() => ErrorSchema!, { nullable: true })
	async register(@Arg("data") { name }: Partial<Room>) {
		this.roomRepository.create({
			name,
		});
	}
}

export default RegisterResolver;
