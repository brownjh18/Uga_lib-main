import { Transaction } from "src/transaction/entities/transaction.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentMode {
    @PrimaryGeneratedColumn()
    paymentModeId: number;

    @Column()
    method: string;

    @OneToMany(() => Transaction, tx => tx.paymentMode)
    transactions: Transaction[];
}
