import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  // Teacher's initial outline for the course.
  @Column("text")
  outline!: string;

  // Populated by the LLM process.
  @Column({ nullable: true })
  youtubePlaylist?: string;

  @Column({ nullable: true })
  generatedImage?: string;

  @Column("text", { nullable: true })
  generatedContent?: string;

  // The teacher who created the course.
  @ManyToOne(() => User, (user) => user.id)
  teacher!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
