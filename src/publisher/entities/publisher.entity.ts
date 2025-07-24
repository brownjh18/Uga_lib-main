import { Ebook } from "src/ebook/entities/ebook.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publisher {
    @PrimaryGeneratedColumn()
    publisherId: number;

    @Column()
    name: string;

    @OneToMany(() => Ebook, ebook => ebook.publisher)
    ebooks: Ebook[];
}
