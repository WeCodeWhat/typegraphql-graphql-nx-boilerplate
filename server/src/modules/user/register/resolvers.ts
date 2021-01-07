import { Arg, Query, Resolver } from "type-graphql";
// import { getRepository } from "typeorm";
// import { User as UserEntity } from "../../../entity/User";
import { User as UserSchema } from "./schema";

@Resolver(UserSchema)
export class UserResolver {
	// constructor(private userService : User ){}

	@Query((returns) => String!)
	async user(@Arg("id") id: string) {
		// const user = await getRepository(UserEntity).findOne(id);
		// if (!user) return null;
		// return user;
		return "Hello World";
	}
}
