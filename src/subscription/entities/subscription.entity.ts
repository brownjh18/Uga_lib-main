import { Plan } from "src/plan/entities/plan.entity";
import { Transaction } from "src/transaction/entities/transaction.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    subscriptionId: number;

    @ManyToOne(() => User, user => user.subscriptions)
    user: User;

    @ManyToOne(() => Plan, plan => plan.subscriptions)
    plan: Plan;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @OneToMany(() => Transaction, Transaction => Transaction.subscription)
    transactions: Transaction[];

    // @Column()
    // status: string;
}
