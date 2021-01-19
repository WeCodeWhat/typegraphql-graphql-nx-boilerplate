import { Arg, Resolver, Mutation } from "type-graphql";
import { User } from "../../../entity/User";
import { Error as ErrorSchema } from "../../common/error.schema";
import { LoginInput } from "./LoginInput";
import { UserRepository } from "../../repos/UserRepo";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ErrorMessage } from "./ErrorMessage";
import * as bcrypt from "bcrypt";

@Resolver((of) => User)
class LoginResolver {
	@InjectRepository(UserRepository)
	private readonly userRepository: UserRepository;

	@Mutation(() => ErrorSchema!, { nullable: true })
	async login(@Arg("data") { email, password }: LoginInput) {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			return {
				path: "email",
				message: ErrorMessage.accountIsNotRegister,
			};
		}
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return {
				path: "password",
				message: ErrorMessage.passwordIsNotMatch,
			};
		}
		return null;
	}
}

export default LoginResolver;
