export class Account {
  id: number;
  type: string;
  balance: number;
  currency?: string;
  name: string;

  constructor(id: number, type: string, balance: number, currency: string, name: string) {
    this.id = id;
    this.type = type;
    this.balance = balance;
    this.currency = currency;
    this.name = name;
  }
}
