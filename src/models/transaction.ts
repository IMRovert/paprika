import {Category} from "./category";


export class Transaction {
  amount: number;
  currency: string;
  date: number;
  description: string;
  account: number;
  category: Category;
  type: string;
  id: number;


  constructor(id: number, amount: number, currency: string, date: number, description: string, account: number, categoryName: string, categoryNumber: number, type: string) {
    this.id = id;
    this.amount = amount;
    this.currency = currency;
    this.date = date;
    this.description = description;
    this.account = account;
    this.category = new Category(categoryNumber, categoryName);
    this.type = type;
  }
}
