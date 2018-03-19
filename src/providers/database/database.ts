import {Injectable} from '@angular/core';
import {User} from "../../models/user";
import {Transaction} from "../../models/transaction";
import {Category} from "../../models/category";

/*
  Generated class for the SQLiteDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export abstract class DatabaseProvider {

  abstract decryptData(): Promise<any>;

  abstract encryptData(): Promise<any>;

  abstract verifyCredentials(name: string, password: string): Promise<boolean>;

  abstract createUser(user: User): Promise<User>;

  abstract resetPassword(password: string): Promise<any>;

  abstract getUser(): Promise<User>;

  abstract getAccounts(): Promise<any>;

  abstract addAccount(user: object, account: object): Promise<any>;

  abstract addTransaction(transaction: Transaction): Promise<boolean>;

  abstract addBill(bill: object): Promise<any>;

  abstract updateTransaction(id: number, transaction: Transaction): Promise<boolean>;

  abstract updateBill(): Promise<any>;

  abstract payBill(): Promise<any>;

  abstract getTransactionHistory(): Promise<Transaction[]>;

  abstract getBills(): Promise<any>;

  abstract getBalance(account: object): Promise<any>;

  abstract exportData(): Promise<any>;

  abstract importData(): Promise<any>;

  abstract getCategories(): Promise<Category[]>;

  abstract addCategory(name: string): Promise<boolean>;

  abstract getSpendingChartData(startDate: Date, endDate: Date): Promise<Array<{ date: Date, amount: number }>>;

  abstract getCategoryChartData(startDate: Date, endDate: Date): Promise<Array<{ name: string, amount: number }>>;
}


@Injectable()
export class SQLiteDatabaseProvider extends DatabaseProvider {

  getCategoryChartData(startDate: Date, endDate: Date): Promise<Array<{ name: string; amount: number }>> {
    return undefined;
  }

  getSpendingChartData(startDate: Date, endDate: Date): Promise<Array<{ date: Date; amount: number }>> {
    return undefined;
  }

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

  resetPassword(password: string): Promise<any> {
    return undefined;
  }

  decryptData(): Promise<any> {
    return undefined;
  }

  encryptData(): Promise<any> {
    return undefined;
  }

  verifyCredentials(name: string, password: string): Promise<boolean> {
    return undefined;
  }

  getAccounts(): Promise<any> {
    return undefined;
  }

  addAccount(user: object, account: object): Promise<any> {
    return undefined;
  }

  addTransaction(transaction: Transaction): Promise<boolean> {
    return undefined;
  }

  addBill(bill: object): Promise<any> {
    return undefined;
  }

  updateTransaction(id: number, transaction: Transaction = null): Promise<boolean> {
    return undefined;
  }

  updateBill(): Promise<any> {
    return undefined;
  }

  payBill(): Promise<any> {
    return undefined;
  }

  getTransactionHistory(): Promise<Transaction[]> {
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

