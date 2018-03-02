import {Injectable} from '@angular/core';

/*
  Generated class for the SQLiteDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export declare class DatabaseProvider{
  decryptData():Promise<any>;
  encryptData():Promise<any>;
  verifyCredentials(id: number, password: string):Promise<boolean>;
  createUser(info: object):Promise<any>;
  getUser():Promise<any>;
  getAccounts(user: object):Promise<any>;
  addAccount(user: object, account: object):Promise<any>;
  addTransaction(transaction: object):Promise<any>;
  addBill(bill: object):Promise<any>;
  updateTransaction():Promise<any>;
  updateBill():Promise<any>;
  payBill():Promise<any>;
  getTransactionHistory():Promise<any>;
  getBills():Promise<any>;
  getBalance(account: object):Promise<any>;
  exportData():Promise<any>;
  importData():Promise<any>;

}


@Injectable()
export class SQLiteDatabaseProvider implements DatabaseProvider{
  decryptData(): Promise<any> {
    return undefined;
  }

  encryptData(): Promise<any> {
    return undefined;
  }

  verifyCredentials(id: number, password: string): Promise<boolean> {
    return undefined;
  }

  createUser(info: object): Promise<any> {
    return undefined;
  }

  getUser(): Promise<any> {
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
    console.log('Hello SQLiteDatabaseProvider Provider');
  }

}

