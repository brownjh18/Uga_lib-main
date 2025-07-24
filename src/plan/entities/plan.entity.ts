import { Subscription } from "src/subscription/entities/subscription.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Plan {
    @PrimaryGeneratedColumn()
    planId: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    duration: number;

    @Column()
    description: string;

    @OneToMany(() => Subscription, subscription => subscription.plan)
    subscriptions: Subscription[];
}
