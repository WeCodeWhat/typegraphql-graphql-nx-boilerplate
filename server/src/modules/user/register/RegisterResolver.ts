import { Arg, Resolver, Mutation, Query } from "type-graphql";
import { User } from "../../../entity/User";
import { Error as ErrorSchema } from "../../common/error.schema";
import { ErrorMessage } from "./ErrorMessage";
import { RegisterInput } from "./RegisterInput";

@Resolver((of) => User)
class RegisterResolver {
	@Query(() => String)
	hello() {
		return "Hello World";
	}

	@Mutation(() => ErrorSchema!, { nullable: true })
	async register(
		@Arg("data") { email, firstName, lastName, password }: RegisterInput
	) {
		if (await User.findOne({ where: { email } })) {
			return {
				path: "email",
				message: ErrorMessage.emailIsRegister,
			};
		}

		await User.create({
			email,
			password,
			firstName,
			lastName,
		})
			.save()
			.then((err) => console.log(err));

		return null;
	}
}

export default RegisterResolver;
