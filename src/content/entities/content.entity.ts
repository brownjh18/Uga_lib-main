import { Ebook } from "src/ebook/entities/ebook.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    contentId: number;

    @Column()
    chapterTitle: string;

    @Column()
    pageNumber: number;

    @ManyToOne(() => Ebook, ebook => ebook.contents)
    ebook: Ebook;
}
