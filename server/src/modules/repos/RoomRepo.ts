import { EntityRepository, Repository } from "typeorm";
import { Room } from "../../entity/Room";

@EntityRepository(Room)
export class UserRepository extends Repository<Room> {}
