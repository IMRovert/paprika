import {Injectable} from "@angular/core";
import {DatabaseProvider} from "./database";
import {User} from "../../models/user";

@Injectable()
export class InMemoryDatabaseProvider extends DatabaseProvider {
  createUser(user: User): Promise<User> {
    return new Promise<User>(resolve => {
      this.user = user;
      resolve.apply(this.user);
    });
  }

  private user: User;

  constructor() {
    super();
    console.log('Hello InMemoryDatabaseProvider Provider');
    this.user = new User("Mr. Bla", "password", "matt@mr.bla");
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
    return new Promise<User>(resolve => resolve.apply(new User("Mr. Bla", "password", "matt@mr.bla")));
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
