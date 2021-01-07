import {
	Entity,
	Column,
	PrimaryColumn,
	BeforeInsert,
	BaseEntity,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("Users")
export class User extends BaseEntity {
	constructor() {
		super();
	}

	@PrimaryColumn("uuid")
	id: string;

	@Column("text", { nullable: false, unique: true })
	email: string;

	@Column("text", { nullable: false })
	password: string;

	@BeforeInsert()
	async addId() {
		this.id = uuidv4();
	}
}
