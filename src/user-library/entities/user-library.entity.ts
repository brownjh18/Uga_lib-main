import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Entity()
export class UserLibrary {
  @PrimaryGeneratedColumn()
  userLibraryId: number;

  @ManyToOne(() => User, user => user.userLibraries)
  user: User;

  @ManyToOne(() => Ebook, ebook => ebook.userLibraries)
  ebook: Ebook;

  @CreateDateColumn()
  savedAt: Date;
}
