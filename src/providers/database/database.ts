import {Injectable} from '@angular/core';
import {User} from "../../models/user";
import {Category} from "../../models/category";

/*
  Generated class for the SQLiteDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export abstract class DatabaseProvider {

  abstract decryptData(): Promise<any>;

  abstract encryptData(): Promise<any>;

  abstract verifyCredentials(id: number, password: string): Promise<boolean>;

  abstract createUser(user: User): Promise<User>;

  abstract resetPassword(info: object): Promise<any>;

  abstract getUser(): Promise<User>;

  abstract getAccounts(user: object): Promise<any>;

  abstract addAccount(user: object, account: object): Promise<any>;

  abstract addTransaction(transaction: object): Promise<any>;

  abstract addBill(bill: object): Promise<any>;

  abstract updateTransaction(): Promise<any>;

  abstract updateBill(): Promise<any>;

  abstract payBill(): Promise<any>;

  abstract getTransactionHistory(): Promise<any>;

  abstract getBills(): Promise<any>;

  abstract getBalance(account: object): Promise<any>;

  abstract exportData(): Promise<any>;

  abstract importData(): Promise<any>;

  abstract getCategories(): Promise<Category[]>;

  abstract addCategory(name: string): Promise<boolean>;
}


@Injectable()
export class SQLiteDatabaseProvider extends DatabaseProvider {
  getCategories(): Promise<Category[]> {
    return undefined;
  }

  addCategory(name: string): Promise<boolean> {
    return undefined;
  }

  createUser(user: User): Promise<User> {
    return undefined;
  }

  getUser(): Promise<User> {
    return undefined;
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

  constructor() {
    super();
    console.log('Hello SQLiteDatabaseProvider Provider');
  }

}

