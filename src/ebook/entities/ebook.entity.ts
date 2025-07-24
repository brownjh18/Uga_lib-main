import { Aggregator } from "src/aggregator/entities/aggregator.entity";
import { Author } from "src/author/entities/author.entity";
import { Category } from "src/category/entities/category.entity";
import { Content } from "src/content/entities/content.entity";
import { Publisher } from "src/publisher/entities/publisher.entity";
import { Review } from "src/review/entities/review.entity";
import { UserBook } from "src/user-book/entities/user-book.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ebook {
  @PrimaryGeneratedColumn()
  ebookId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  fileUrl: string;

  @ManyToOne(() => Author, author => author.ebooks)
  author: Author;

  @ManyToOne(() => Publisher, publisher => publisher.ebooks)
  publisher: Publisher;

  @ManyToOne(() => Aggregator, aggregator => aggregator.ebooks)
  aggregator: Aggregator;

  @ManyToOne(() => Category, category => category.ebooks)
  category: Category;

  @OneToMany(() => Content, content => content.ebook)
  contents: Content[];

  @OneToMany(() => UserBook, ub => ub.ebook)
  userBooks: UserBook[];

  @OneToMany(() => Review, review => review.ebook)
  reviews: Review[];
}

