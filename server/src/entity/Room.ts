import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryColumn,
} from "typeorm";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";
import { Chat } from "./Chat";
import { ValidateNested } from "class-validator";

@ObjectType()
@Entity("Room")
export class Room extends BaseEntity {
	@Field(() => ID)
	@PrimaryColumn("uuid")
	id: string;

	@Field(() => [User])
	@OneToMany(() => User, (member) => member.id)
	@ValidateNested()
	members: User[];

	@Field(() => String!)
	@Column("text", { nullable: false, default: new Date().toISOString() })
	createdAt: string;

	@Field(() => [Chat])
	@OneToMany(() => Chat, (chat) => chat.id)
	@ValidateNested()
	history: Chat[];

	@BeforeInsert()
	async addId() {
		this.id = uuidv4();
	}
}
