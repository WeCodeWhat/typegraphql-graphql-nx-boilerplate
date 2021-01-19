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

@ObjectType()
@Entity("Chat")
export class Chat extends BaseEntity {
	@Field(() => ID)
	@PrimaryColumn("uuid")
	id: string;

	@Field(() => User!)
	@ManyToOne(() => User, (sender) => sender.id)
	sender: User;

	@Field(() => String!)
	message: string;

	@Field(() => String!)
	@Column("text", { nullable: false, default: new Date().getUTCDate() })
	createdAt: string;

	@BeforeInsert()
	async addId() {
		this.id = uuidv4();
	}
}
