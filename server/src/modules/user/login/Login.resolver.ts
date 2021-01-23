import { Arg, Resolver, Mutation, Ctx, UseMiddleware } from "type-graphql";
import { User } from "../../../entity/User";
import { Error as ErrorSchema } from "../../common/error.schema";
import { LoginInput } from "./Login.input";
import { UserRepository } from "../../repos/UserRepo";
import { InjectRepository } from "typeorm-typedi-extensions";
import * as bcrypt from "bcrypt";
import { GQLContext } from "../../../utils/graphql-utils";
import { redis } from "../../../helper/redis";
import { USER_SESSION_ID_PREFIX } from "../../../constants/global-variables";
import { ErrorMessage } from "../../common/ErrorMessage";
import { yupValidateMiddleware } from "../../middleware/yupValidate";
import { YUP_SCHEMA } from "../../common/yupSchema";

@Resolver((of) => User)
class LoginResolver {
	@InjectRepository(UserRepository)
	private readonly userRepository: UserRepository;
	@UseMiddleware(yupValidateMiddleware(YUP_SCHEMA))
	@Mutation(() => ErrorSchema!, { nullable: true })
	async login(
		@Arg("data") { email, password }: LoginInput,
		@Ctx() { request, session }: GQLContext
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
		session.userId = user.id;
		if (request.sessionID) {
			redis.lpush(`${USER_SESSION_ID_PREFIX}${user.id}`, user.id);
		}
		return null;
	}
}

export default LoginResolver;
