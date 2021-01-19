import { EntityRepository, Repository } from "typeorm";
import { Chat } from "../../entity/Chat";

@EntityRepository(Chat)
export class UserRepository extends Repository<Chat> {}
