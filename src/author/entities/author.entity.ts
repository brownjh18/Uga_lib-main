import { Ebook } from "src/ebook/entities/ebook.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    authorId: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    biography: string;

    @OneToMany(() => Ebook, ebook => ebook.author)
    ebooks: Ebook[];
}
