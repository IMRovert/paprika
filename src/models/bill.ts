export class Bill {
  date: string;
  payee: string;
  amount: number;
  repeat: string;
  paid: boolean;

  constructor(date: string, payee: string, amount: number, repeat: string) {
    this.date = date;
    this.payee = payee;
    this.amount = amount;
    this.repeat = repeat;
    this.paid = false;
  }
}
