export class Account {
  id: number;
  branch: string;
  name: number;
  type: string;
  balance: number;
  currency?: string;

  constructor(id: number, branch: string, name: number, type: string, balance: number, currency: string) {
    this.id = id;
    this.branch = branch;
    this.name = name;
    this.type = type;
    this.balance = balance;
    this.currency = currency;
  }
}
