import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  bookmarkId: number;

  @Column({ type: 'int' })
  pageNumber: number;

  @Column({ nullable: true })
  note: string;

  @ManyToOne(() => User, user => user.bookmarks)
  user: User;

  @ManyToOne(() => Ebook, ebook => ebook.bookmarks)
  ebook: Ebook;
}
