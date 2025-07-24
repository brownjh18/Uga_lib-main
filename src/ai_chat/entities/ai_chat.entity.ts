import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column('text')
  userMessage: string;

  @Column('text')
  aiResponse: string;

  @CreateDateColumn()
  timestamp: Date;
}