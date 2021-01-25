import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
} from "typeorm";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";
import { Chat } from "./Chat";
@ObjectType("RoomSchema")
@Entity("Room")
export class Room extends BaseEntity {
	@Field(() => ID)
	@PrimaryColumn("uuid")
	id: string;

	@Field(() => String!)
	@Column("text")
	name: string;

	@Field(() => String!)
	@Column("text", { nullable: false, default: new Date().toISOString() })
	createdAt: string;

	@ManyToOne(() => User, (user) => user.id)
	owner: User;

	@OneToMany(() => User, (user) => user.room)
	members: User[];

	@OneToMany(() => Chat, (chat) => chat.room)
	messages: Chat[];

	@BeforeInsert()
	async addId() {
		this.id = uuidv4();
	}
}
