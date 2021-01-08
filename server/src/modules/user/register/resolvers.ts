import { Arg, Resolver, Mutation, Query } from "type-graphql";
import { User } from "../../../entity/User";
import { Error as ErrorSchema } from "../../common/error.schema";
import { ErrorMessage } from "./ErrorMessage";
@Resolver()
export default class {
	@Query(() => String)
	hello() {
		return "Hello World";
	}

	@Mutation(() => ErrorSchema!, { nullable: true })
	async register(
		@Arg("email") email: string,
		@Arg("password") password: string
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
		})
			.save()
			.then((err) => console.log(err));

		return null;
	}
}
