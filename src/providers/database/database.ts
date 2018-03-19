import {Injectable} from '@angular/core';
import {User} from "../../models/user";
import {Transaction} from "../../models/transaction";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Platform} from "ionic-angular";

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

  abstract addTransaction(transaction: object): Promise<any>;

  abstract addBill(bill: object): Promise<any>;

  abstract updateTransaction(id: number): Promise<Transaction>;

  abstract updateBill(): Promise<any>;

  abstract payBill(): Promise<any>;

  abstract getTransactionHistory(): Promise<any>;

  abstract getBills(): Promise<any>;

  abstract exportData(): Promise<any>;

  abstract importData(): Promise<any>;
}


@Injectable()
export class SQLiteDatabaseProvider extends DatabaseProvider {
  createUser(user: User): Promise<User> {
    return undefined;
  }

  getUser(): Promise<User> {
    return new Promise<User>(resolve => {
      let u = new User("Matt", "password2", "matt@mr.bla");
      resolve(u);
    });
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

  verifyCredentials(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      resolve(email == null && password == null);
    });
  }

  getAccounts(): Promise<any> {
    return undefined;
  }

  addAccount(user: object, account: Account): Promise<any> {
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
    return this.db.executeSql("SELECT * FROM transaction", {});
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

  db: SQLiteObject;

  constructor(private platform: Platform, private sqlite: SQLite) {
    super();
    platform.ready()
      .then(value => {
        return this.sqlite.create({
          name: 'data.db',
          location: 'default'
        }).then(dbobj => {
          this.db = dbobj;
          return this.createTables(dbobj);
        }).catch(reason => {
          console.log("DB ERROR: " + reason);
        });
      });

    console.log('Hello SQLiteDatabaseProvider Provider');

  }

  private createTables(dbobj) {
    dbobj.executeSql('CREATE TABLE IF NOT EXISTS account(\n' +
      '  id int PRIMARY KEY AUTOINCREMENT,\n' +
      '  branch text,\n' +
      '  bank text,\n' +
      '  type text,\n' +
      '  balance numeric(8,2),\n' +
      '  currency text),\n' +
      ');', {}).then(
      dbobj.executeSql('CREATE TABLE IF NOT EXISTS bill(\n' +
        '  date integer,\n' +
        '  payee text,\n' +
        '  amount numeric(8,2),\n' +
        '  repeat text,\n' +
        '  paid tinyint,\n' +
        '  CONSTRAINT prim PRIMARY KEY(date, payee)\n' +
        ');', {})
    ).then(
      dbobj.executeSql('CREATE TABLE IF NOT EXISTS category (\n' +
        '  code int PRIMARY KEY AUTOINCREMENT,\n' +
        '  name text\n' +
        ');', {}))
      .then(
        dbobj.executeSql('CREATE TABLE IF NOT EXISTS transaction (\n' +
          '  id int PRIMARY KEY AUTOINCREMENT,\n' +
          '  amount NUMERIC(5,2),\n' +
          '  currency text,\n' +
          '  date DATETIME,\n' +
          '  description text,\n' +
          '  account INTEGER,\n' +
          '  category int,\n' +
          '  type text,\n' +
          '  CONSTRAINT acc FOREIGN KEY(account) REFERENCES account(id) ON DELETE SET NULL ON UPDATE CASCADE\n' +
          '  CONSTRAINT cat FOREIGN KEY(category) REFERENCES category(code) ON DELETE SET NULL ON UPDATE CASCADE\n' +
          ');', {}));
  }
}

