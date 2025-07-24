import { Profile } from 'src/profile/entities/profile.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { UserBook } from 'src/user-book/entities/user-book.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/user/entities/role.enum'; // make sure the enum is imported from the right place

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT,
  })
  role: Role;

  @OneToOne(() => Profile, profile => profile.user, { cascade: true, nullable: true })
  @JoinColumn()
  profile?: Profile;

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => UserBook, userBook => userBook.user)
  userBooks: UserBook[];
}
