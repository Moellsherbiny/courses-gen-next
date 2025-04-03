import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "@/entity/User";

@Entity()
export class UserType {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column("enum", {
    enum: ["student", "teacher"],
    default: "student",
    unique: true,
  })
  name?: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => User, (user) => user.role)
  users?: User[];

  
}
