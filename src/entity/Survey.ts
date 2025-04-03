// src/entity/Survey.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";
import { type SurveyResponses } from "@/interfaces/SurveyResponses";

@Entity()
export class Survey {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @ManyToOne(() => User, (user) => user.id)
  student!: User;

  @ManyToOne(() => Course, (course) => course.id)
  course!: Course;

  // Example JSON: { prefersVideos: true, prefersImages: false }
  @Column("json")
  responses!: SurveyResponses;

  @CreateDateColumn()
  createdAt!: Date;
}
