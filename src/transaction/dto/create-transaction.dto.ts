export class CreateTransactionDto {
  userId: string;
  subscriptionId: number;
  paymentModeId: number;
  amount: number;
  status: string;
  transactionDate: Date;
}