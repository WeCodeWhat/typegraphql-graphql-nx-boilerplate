import { EntityRepository, Repository } from "typeorm";
import { Room } from "../../entity/Room";

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {}
