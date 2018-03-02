import {Injectable} from "@angular/core";
import {DatabaseProvider} from "./database";
import {UrlSerializer} from "ionic-angular";
import {User} from "../../models/user";
import {Account} from "../../models/account";

@Injectable()
export class InMemoryDatabaseProvider implements DatabaseProvider {
  createUser(user: User): Promise<User> {
    return new Promise<User>(resolve => {
      this.user = user;
      resolve.apply(this.user);
    });
  }

  private user: User;
  private account: Account;

  constructor() {
    console.log('Hello InMemoryDatabaseProvider Provider');
    this.user = new User("Mr. Bla", "password", "matt@mr.bla");
    this.account = new Account(1, "Grand Spoons","IBM","sav",69.69,"CAD");
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
    return new Promise<User>(resolve => resolve.apply(this.user));
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
