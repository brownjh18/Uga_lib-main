import { Ebook } from "src/ebook/entities/ebook.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column()
    name: string;

    @OneToMany(() => Ebook, ebook => ebook.category)
    ebooks: Ebook[];
}
