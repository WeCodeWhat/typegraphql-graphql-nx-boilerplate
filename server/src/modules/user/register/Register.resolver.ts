import { Arg, Resolver, Mutation, Query, Ctx } from "type-graphql";
import { User } from "../../../entity/User";
import { Error as ErrorSchema } from "../../common/error.schema";
import { RegisterInput } from "./Register.input";
import { UserRepository } from "../../repos/UserRepo";
import { InjectRepository } from "typeorm-typedi-extensions";
import { GQLContext } from "../../../utils/graphql-utils";

@Resolver((of) => User)
class RegisterResolver {
	@InjectRepository(UserRepository)
	private readonly userRepository: UserRepository;

	@Query(() => String)
	hello(@Ctx() { request }: GQLContext) {
		console.log(request.session);
		return "Hello World";
	}

	@Mutation(() => ErrorSchema!, { nullable: true })
	async register(
		@Arg("data") { email, firstName, lastName, password }: RegisterInput
	) {
		const res = await this.userRepository.findByEmailOrCreate({
			email,
			firstName,
			lastName,
			password,
		});

		return res;
	}
}

export default RegisterResolver;
