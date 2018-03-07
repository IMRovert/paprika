import {Injectable} from "@angular/core";
import {DatabaseProvider} from "./database";
import {User} from "../../models/user";
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

  constructor() {
    super();
    console.log('Hello InMemoryDatabaseProvider Provider');
    this.user = new User("Mr. Bla", "password", "matt@mr.bla");
    this.categories = Array();
    this.categories.push(new Category(0, "Student Loans"));
    this.categories.push(new Category(1, "Education"));
  }

  resetPassword(info: object): Promise<any> {
    return undefined;
  }

  decryptData(): Promise<any> {
    return undefined;
  }

  encryptData(): Promise<any> {
    return undefined;
  }

  verifyCredentials(id: number, password: string): Promise<boolean> {
    return undefined;
  }

  getUser(): Promise<User> {
    return new Promise<User>(resolve => resolve(this.user));
  }

  getAccounts(user: object): Promise<any> {
    return undefined;
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

  updateTransaction(): Promise<any> {
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


}
