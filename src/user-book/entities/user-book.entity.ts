import { Ebook } from "src/ebook/entities/ebook.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserBook {
    @PrimaryGeneratedColumn()
    userBookId: number;

    @ManyToOne(() => User, user => user.userBooks)
    user: User;

    @ManyToOne(() => Ebook, ebook => ebook.userBooks)
    ebook: Ebook;

    @Column({ default: false })
    isDownloaded: boolean;

    @Column({ default: false })
    isViewed: boolean;

    @CreateDateColumn()
    accessedAt: Date;
}
