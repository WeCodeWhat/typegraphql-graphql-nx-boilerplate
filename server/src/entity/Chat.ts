import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	ManyToOne,
	PrimaryColumn,
} from "typeorm";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";
import { Room } from "./Room";
import { getFullDayTime } from "../utils/date";

@ObjectType("ChatSchema")
@Entity("Chat")
export class Chat extends BaseEntity {
	@Field(() => ID)
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(() => User, (user) => user.id)
	sender: User;

	@Field(() => String!)
	@Column("text", { nullable: false })
	message: string;

	@Field(() => String!)
	@Column("text", { nullable: false, default: getFullDayTime() })
	createdAt: string;

	@ManyToOne(() => Room, (room) => room.messages)
	room: Room;

	@BeforeInsert()
	async addId() {
		this.id = uuidv4();
	}
}
