import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  reviewId: number;

  @Column({ type: 'int', width: 1 })
  rating: number; // 1 to 5

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

//   @Column()
//   userId: string;

//   @Column()
//   ebookId: number;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Ebook, ebook => ebook.reviews)
  ebook: Ebook;
}
