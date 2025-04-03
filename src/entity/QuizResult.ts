import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

interface QuizResponses {
  [questionId: string]: string | number;
}

@Entity()
export class QuizResult {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @ManyToOne(() => Course, (course) => course.id)
  course!: Course;

  @ManyToOne(() => User, (user) => user.id)
  student!: User;

  // A numerical score or level.
  @Column("float")
  score!: number;

  // Optionally, store detailed quiz responses.
  @Column("json", { nullable: true })
  responses?: QuizResponses;

  @CreateDateColumn()
  createdAt!: Date;
}
