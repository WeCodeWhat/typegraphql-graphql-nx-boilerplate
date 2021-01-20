import { Arg, Resolver, Mutation, Ctx, UseMiddleware } from "type-graphql";
import { User } from "../../../entity/User";
import { Error as ErrorSchema } from "../../common/error.schema";
import { LoginInput } from "./LoginInput";
import { UserRepository } from "../../repos/UserRepo";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ErrorMessage } from "./ErrorMessage";
import * as bcrypt from "bcrypt";
import { GQLContext } from "../../../utils/graphql-utils";
import { redis } from "../../../helper/redis";
import { USER_SESSION_ID_PREFIX } from "../../../constants/global-variables";
import { isAuth } from "../../middleware/isAuth";

@Resolver((of) => User)
class LoginResolver {
	@InjectRepository(UserRepository)
	private readonly userRepository: UserRepository;

	@UseMiddleware(isAuth)
	@Mutation(() => ErrorSchema!, { nullable: true })
	async login(
		@Arg("data") { email, password }: LoginInput,
		@Ctx() { req, session }: GQLContext
	) {
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
		req.session.userId = user.id;
		if (session.userId) {
			redis.lpush(`${USER_SESSION_ID_PREFIX}${user.id}`, user.id);
		}
		return null;
	}
}

export default LoginResolver;
