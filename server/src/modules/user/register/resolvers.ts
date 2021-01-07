import { Arg, Query, Resolver, ObjectType, Field } from "type-graphql";
import { User } from "../../../entity/User";
import { ErrorMessage } from "./ErrorMessage";

@ObjectType()
export class Error {
	@Field()
	path: string;

	@Field()
	message: string;
}

@Resolver()
export default class {
	@Query(() => Error!)
	async register(@Arg("email") email: string, password: string) {
		await User.create({
			email,
			password,
		}).save();

		return null;
	}
}
