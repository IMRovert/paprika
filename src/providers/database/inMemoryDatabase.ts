import {Injectable} from "@angular/core";
import {DatabaseProvider} from "./database";

@Injectable()
export class InMemoryDatabaseProvider implements DatabaseProvider {
  decryptData(): Promise<any> {
    return undefined;
  }

  encryptData(): Promise<any> {
    return undefined;
  }

  verifyCredentials(id: number, password: string): Promise<boolean> {
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

  createUser() {
    return new Promise<any>(resolve => {
      resolve.apply({});
    })
  }

}
