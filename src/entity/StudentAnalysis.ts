import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@Entity()
export class StudentAnalysis {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @ManyToOne(() => Course, (course) => course.id)
  course!: Course;

  @ManyToOne(() => User, (user) => user.id)
  student!: User;

  @Column("text")
  analysis!: string;

  @CreateDateColumn()
  generatedAt!: Date;
}
