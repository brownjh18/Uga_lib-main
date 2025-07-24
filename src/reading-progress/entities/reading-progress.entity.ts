import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Entity()
export class ReadingProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currentPage: number;

  @Column({ type: 'float', default: 0 })
  progressPercentage: number;

  @ManyToOne(() => User, user => user.readingProgress)
  user: User;

  @ManyToOne(() => Ebook, ebook => ebook.readingProgress)
  ebook: Ebook;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
