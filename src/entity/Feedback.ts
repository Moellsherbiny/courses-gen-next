import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Course, (course) => course.id)
  course!: Course;

  @ManyToOne(() => User, (user) => user.id)
  teacher!: User;

  @ManyToOne(() => User, (user) => user.id)
  student!: User;

  @Column("text")
  message!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
