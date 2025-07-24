import { Ebook } from "src/ebook/entities/ebook.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Aggregator {
    @PrimaryGeneratedColumn()
    aggregatorId: number;

    @Column()
    name: string;

    @OneToMany(() => Ebook, ebook => ebook.aggregator)
    ebooks: Ebook[];
}
