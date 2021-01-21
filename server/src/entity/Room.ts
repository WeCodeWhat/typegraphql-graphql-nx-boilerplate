import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn,
} from "typeorm";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";
import { Chat } from "./Chat";
import { ValidateNested } from "class-validator";

@ObjectType("RoomSchema")
@Entity("Room")
export class Room extends BaseEntity {
	@Field(() => ID)
	@PrimaryColumn("uuid")
	id: string;

	@Field(() => String!)
	@Column("text")
	name: string;

	@Field(() => User!)
	@OneToOne(() => User, (member) => member.id, {
		cascade: true,
	})
	@JoinColumn()
	owner: User;

	@Field(() => [User]!)
	@ManyToOne(() => User, (member) => member.id)
	@Column("text", { array: true, default: {} })
	@ValidateNested()
	members: string[];

	@Field(() => String!)
	@Column("text", { nullable: false, default: new Date().toISOString() })
	createdAt: string;

	@Field(() => [Chat])
	@ManyToOne(() => Chat, (chat) => chat.id)
	@ValidateNested()
	@Column("text", { array: true, default: {} })
	history: string[];

	@BeforeInsert()
	async addOwnerToMembers() {
		this.members.push(this.owner.id);
	}

	@BeforeInsert()
	async addId() {
		this.id = uuidv4();
	}
}
