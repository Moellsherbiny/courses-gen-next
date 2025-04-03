// src/entity/Enrollment.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Course, (course) => course.id)
  course!: Course;

  @ManyToOne(() => User, (user) => user.id)
  student!: User;

  @CreateDateColumn()
  enrolledAt!: Date;
}
