import {Injectable} from "@angular/core";
import {DatabaseProvider} from "./database";
import {User} from "../../models/user";
import {Account} from "../../models/account";
import {Transaction} from "../../models/transaction";
import {Category} from "../../models/category";
import moment from 'moment';
import {Bill} from "../../models/bill";

@Injectable()
export class InMemoryDatabaseProvider extends DatabaseProvider {

  categories: Category[];

  getCategoryChartData(startDate: Date, endDate: Date): Promise<Array<{ name: string; amount: number }>> {
    return new Promise<Array<{ name: string, amount: number }>>(resolve => {
      let data = Array();
      data.push({name: "Food", amount: 200});
      data.push({name: "Gas", amount: 400});
      data.push({name: "Entertainment", amount: 40});
      data.push({name: "Student Loans", amount: 500});
      resolve(data);
    });
  }


  getSpendingChartData(startDate: Date, endDate: Date): Promise<Array<{ date: Date; amount: number }>> {
    return new Promise<Array<{ date: Date, amount: number }>>(resolve => {
      let data = Array<{ date: Date; amount: number }>();
      let start = moment(startDate);
      data.push({date: start.toDate(), amount: 200});
      data.push({date: start.add(1, 'day').toDate(), amount: 400});
      data.push({date: start.add(2, 'day').toDate(), amount: 250});
      data.push({date: start.add(3, 'day').toDate(), amount: 0});
      data.push({date: start.add(4, 'day').toDate(), amount: 10});
      resolve(data);
    });
  }

  getCategories(): Promise<Category[]> {
    return new Promise<Category[]>(resolve => resolve(this.categories));
  }

  addCategory(name: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
        this.categories.push(new Category(this.categories.length, name));
        resolve(true);
      }
    );
  }

  createUser(user: User): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.user = user;
      resolve(true);
    });
  }

  private user: User;
  private account: Account;
  private accounts: Account[];
  private transactions: Transaction[];
  private bills: Bill[];

  constructor() {
    super();
    console.log('Hello InMemoryDatabaseProvider Provider');
    this.user = new User("Mr. Bla", "password", "matt@mr.bla");
    this.account = new Account(1, "sav", 69.69, "CAD", "My Account");
    this.accounts = [];
    this.accounts.push(this.account);
    this.categories = Array();
    this.categories.push(new Category(0, "Entertainment"));
    this.categories.push(new Category(1, "Income"));
    this.categories.push(new Category(2, "Housing"));
    this.categories.push(new Category(3, "Student Loans"));
    this.categories.push(new Category(4, "Education"));
    this.categories.push(new Category(5, "Food"));
    this.categories.push(new Category(6, "Extras"));
    this.transactions = [
      new Transaction(0, 35, 'CAD', new Date(), 'Bought two pizzas from the pizza store', 256037, 'Food', 5, 'withdrawal'),
      new Transaction(1, 66, 'CAD', new Date(), 'bought an overpriced iPhone charger', 256037, 'Extras', 6, 'withdrawal'),
      new Transaction(2, 250, 'CAD', new Date(), 'inheritance check', 256037, 'Income', 1, 'deposit'),
      new Transaction(3, 650, 'CAD', new Date(), 'payed rent', 678234, 'Housing', 2, 'withdrawal'),
      new Transaction(4, 22.44, 'CAD', new Date(), 'beer pong supplies', 678234, 'Extras', 6, 'withdrawal')];

  }

  resetPassword(password: string): Promise<any> {
    this.user.password = password;
    return new Promise<null>(resolve => {
      resolve();
    });
  }

  verifyCredentials(name: string, password: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let valid: boolean;
      if (name == this.user.name && password == this.user.password) {
        valid = true;
      } else {
        valid = false;
      }
      resolve(valid);
    })
  }

  getUser(): Promise<User | null> {
    return new Promise<User>(resolve => {
      resolve(this.user);
    });
  }

  getAccounts(): Promise<Account[]> {
    return new Promise<Account[]>(resolve => {
      resolve(this.accounts);
    });
  }

  addAccount(account: Account): Promise<boolean> {
    this.accounts.push(account);
    return new Promise<boolean>(resolve => {
      resolve(true);
    });
  }

  addTransaction(transaction: Transaction): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      transaction.id = this.transactions.length;
      this.transactions.push(transaction);
      resolve(true);
    });
  }

  addBill(bill: Bill): Promise<boolean> {
    this.bills.push(bill);
    return new Promise<boolean>(resolve => {
      resolve(true);
    });
  }

  updateTransaction(id: number, transaction: Transaction): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      for (let i = 0; i < this.transactions.length; i++) {
        if (this.transactions[i].id === id) {
          this.transactions[i] = transaction;
        }
      }
      resolve(true);
    });
  }

  updateBill(): Promise<any> {
    return undefined;
  }

  payBill(): Promise<any> {
    return undefined;
  }

  getTransactionHistory(): Promise<Transaction[]> {
    return new Promise<Transaction[]>(resolve => {
      resolve(this.transactions);
    });
  }

  getBills(): Promise<any> {
    return undefined;
  }

  exportData(): Promise<any> {
    return undefined;
  }

  importData(): Promise<any> {
    return undefined;
  }

  decryptData(): Promise<any> {
    return undefined;
  }

  encryptData(): Promise<any> {
    return undefined;
  }


}
