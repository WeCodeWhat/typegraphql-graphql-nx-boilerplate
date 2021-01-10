import { Field, ID, ObjectType, Root } from "type-graphql";
import {
	Entity,
	Column,
	PrimaryColumn,
	BeforeInsert,
	BaseEntity,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@ObjectType("User schema")
@Entity("Users")
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryColumn("uuid")
	id: string;

	@Field(() => String!)
	@Column("text", { unique: true })
	email: string;

	@Field(() => String!)
	@Column()
	password: string;

	@Field(() => String!)
	@Column()
	firstName: string;

	@Field(() => String!)
	@Column({ nullable: true })
	lastName: string;

	@Field(() => String!)
	name(@Root() parent: User): string {
		return `${parent.firstName} ${parent.lastName}`;
	}

	@BeforeInsert()
	async addId() {
		this.id = uuidv4();
	}
}
