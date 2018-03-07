import {Injectable} from "@angular/core";
import {DatabaseProvider} from "./database";
import {User} from "../../models/user";
import {Account} from "../../models/account";
import {Transaction} from "../../models/transaction";
import {Bill} from "../../models/bill";

@Injectable()
export class InMemoryDatabaseProvider extends DatabaseProvider {
  createUser(user: User): Promise<User> {
    return new Promise<User>(resolve => {
      this.user = user;
      resolve(this.user);
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
    this.account = new Account(1, "Grand Spoons", "IBM", "sav", 69.69, "CAD");
    this.accounts = [];
    this.transactions = [];
    this.accounts.push(this.account);
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

  addAccount(account: Account): Promise<boolean> {
    this.accounts.push(account);
    return new Promise<boolean>(resolve => {
      resolve(true);
    });
  }

  addTransaction(transaction: Transaction): Promise<boolean> {
    this.transactions.push(transaction);
    return new Promise<boolean>(resolve => {
      resolve(true);
    });
  }

  addBill(bill: Bill): Promise<boolean> {
    this.bills.push(bill);
    return new Promise<boolean>(resolve => {
      resolve(true);
    });
  }

  updateTransaction(id: number): Promise<Transaction> {
      return null;
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
