export class Account {
  id: number;
  branch: string;
  bank: string;
  type: string;
  balance: number;
  currency?: string;

  constructor(id: number, branch: string, bank: string, type: string, balance: number, currency: string) {
    this.id = id;
    this.branch = branch;
    this.bank = bank;
    this.type = type;
    this.balance = balance;
    this.currency = currency;
  }
}
