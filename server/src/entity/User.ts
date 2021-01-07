import { Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
export class User {
	@PrimaryColumn("uuid")
	id: string;

	@Column()
	name: string;

	@BeforeInsert()
	async addId() {
		this.id = uuidv4();
	}
}
