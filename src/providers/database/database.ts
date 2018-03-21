import {Injectable} from '@angular/core';
import {User} from "../../models/user";
import {Transaction} from "../../models/transaction";
import {Category} from "../../models/category";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Platform} from "ionic-angular";
import set = Reflect.set;

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
    return this.accountInfo.overwriteUser(user);
  }

  getUser(): Promise<User> {
    return new Promise<User>(resolve => {
      let u = new User("Matt", "password2", "matt@mr.bla");
      resolve(u);
    });
    /*return new Promise<User>(resolve => {
      resolve(this.accountInfo.getUser());
    });
    */
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
      let u = this.accountInfo.getUser();
      resolve(email == u.email && password == u.password);
    });
  }

  getAccounts(): Promise<any> {
    return undefined;
  }

  addAccount(user: object, account: Account): Promise<any> {
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
    let rst = this.db.executeSql("SELECT * FROM transaction",{});
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

  db: SQLiteObject;
  accountInfo: userInfo;

  constructor(private platform: Platform, private sqlite: SQLite) {
    super();
    let accountInfo = new userInfo(new Storage());
    platform.ready().then(value => {
      console.log(value);
      sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then(value2 => {
        this.db = value2;
        console.log("DB SUCCESS");
        return this.createTables(value2);
      }).catch(reason => {
        console.log("DB ERROR: " + reason);
      })
    });

    console.log('Hello SQLiteDatabaseProvider Provider');

  }

  private createTables(dbobj) {
    return dbobj.executeSql(
      'CREATE TABLE IF NOT EXISTS account (\n' +
      '  id       INTEGER PRIMARY KEY,\n' +
      '  branch   TEXT,\n' +
      '  bank     TEXT,\n' +
      '  type     TEXT,\n' +
      '  balance numeric(8,2),\n' +
      '  currency TEXT\n' +
      ');', {}).then(
      dbobj.executeSql(
        'CREATE TABLE IF NOT EXISTS bill (\n' +
        '  DATE   INTEGER,\n' +
        '  payee  TEXT,\n' +
        '  amount NUMERIC(8, 2),\n' +
        '  repeat TEXT,\n' +
        '  paid   TINYINT,\n' +
        '  CONSTRAINT prim PRIMARY KEY (DATE, payee)\n' +
        ');', {})
    ).then(
      dbobj.executeSql(
        'CREATE TABLE IF NOT EXISTS category (\n' +
        '  code INTEGER PRIMARY KEY AUTOINCREMENT,\n' +
        '  name TEXT\n' +
        ');', {}))
      .then(
        dbobj.executeSql(
          'CREATE TABLE IF NOT EXISTS transactions (\n' +
          '  id          INTEGER PRIMARY KEY AUTOINCREMENT,\n' +
          '  amount      NUMERIC(5, 2),\n' +
          '  currency    TEXT,\n' +
          '  date        INTEGER,\n' +
          '  description TEXT,\n' +
          '  account     INTEGER,\n' +
          '  category    INTEGER,\n' +
          '  type        TEXT,\n' +
          '  CONSTRAINT acc FOREIGN KEY (account) REFERENCES account (id)\n' +
          '    ON DELETE SET NULL\n' +
          '    ON UPDATE CASCADE\n' +
          '    CONSTRAINT cat FOREIGN KEY (category) REFERENCES category(code) ON DELETE SET NULL ON UPDATE CASCADE\n' +
          ');', {}));
  }
}

@Injectable()
export class userInfo {

  private names: string[];
  private emails: string[];
  private passwords: string[];

  constructor(private storage: Storage) {
    storage.setItem("name", "");
    storage.setItem("email", "");
    storage.setItem("password", "");
  }

  overwriteUser(user: User): Promise<User> {
    return new Promise<User>(resolve => {
      this.names.push(this.storage.getItem("name"));
      this.emails.push(this.storage.getItem("email"));
      this.passwords.push(this.storage.getItem("password"));

      this.storage.setItem("name", user.name);
      this.storage.setItem("email", user.email);
      this.storage.setItem("password", user.password);
      resolve(user);
    });
  }

  getUser(): User {
    return new User(this.storage.getItem("name"), this.storage.getItem("password"), this.storage.getItem("email"));
  }

}

