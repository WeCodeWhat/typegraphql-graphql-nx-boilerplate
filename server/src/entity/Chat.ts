import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn,
} from "typeorm";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";
import { Room } from "./Room";

@ObjectType("ChatSchema")
@Entity("Chat")
export class Chat extends BaseEntity {
	@Field(() => ID)
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(() => User, (user) => user.id)
	sender: User;

	@Field(() => String!)
	message: string;

	@Field(() => String!)
	@Column("text", { nullable: false, default: new Date().getUTCDate() })
	createdAt: string;

	@ManyToOne(() => Room, (room) => room.messages)
	room: Room;

	@BeforeInsert()
	async addId() {
		this.id = uuidv4();
	}
}
