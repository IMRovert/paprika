import {Injectable} from "@angular/core";
import {DatabaseProvider} from "./database";
import {User} from "../../models/user";
import {Account} from "../../models/account";
import {Transaction} from "../../models/transaction";
import {Category} from "../../models/category";

@Injectable()
export class InMemoryDatabaseProvider extends DatabaseProvider {

  categories: Category[];

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

  createUser(user: User): Promise<User> {
    return new Promise<User>(resolve => {
      this.user = user;
      resolve(this.user);
    });
  }

  private user: User;
  private account: Account;
  private accounts: Account[];

  constructor() {
    super();
    console.log('Hello InMemoryDatabaseProvider Provider');
    this.user = new User("Mr. Bla", "password", "matt@mr.bla");
    this.account = new Account(1, "Grand Spoons", "IBM", "sav", 69.69, "CAD");
    this.accounts = [];
    this.accounts.push(this.account);
    this.categories = Array();
    this.categories.push(new Category(0, "Student Loans"));
    this.categories.push(new Category(1, "Education"));
  }

  resetPassword(info: object): Promise<any> {
    return undefined;
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

  getUser(): Promise<User> {
    return new Promise<User>(resolve => {
      resolve(this.user);
    });
  }

  getAccounts(): Promise<Account[]> {
    return new Promise<Account[]>(resolve => {
      resolve(this.accounts);
    });
  }

  addAccount(user: object, account: object): Promise<any> {
    return undefined;
  }

  addTransaction(transaction: object): Promise<any> {
    return undefined;
  }

  addBill(bill: object): Promise<any> {
    return undefined;
  }

  updateTransaction(id: number): Promise<Transaction> {

    return undefined;
  }

  updateBill(): Promise<any> {
    return undefined;
  }

  payBill(): Promise<any> {
    return undefined;
  }

  getTransactionHistory(): Promise<any> {
    return undefined;
  }

  getBills(): Promise<any> {
    return undefined;
  }

  getBalance(account: object): Promise<any> {
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
