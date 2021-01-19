import { EntityRepository, Repository } from "typeorm";
import { User } from "../../entity/User";
import { ErrorMessage } from "../user/register/ErrorMessage";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async findByEmailOrCreate({
		email,
		firstName,
		lastName,
		password,
	}: Partial<User>) {
		const user = await this.findOne({ where: { email } });
		if (!!user) {
			console.log("err");
			return {
				path: "email",
				message: ErrorMessage.emailIsRegister,
			};
		}
		await this.create({
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
