import {Injectable} from '@angular/core';
import {User} from "../../models/user";
import {Account} from "../../models/account";
import {Transaction} from "../../models/transaction";
import {Category} from "../../models/category";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Platform} from "ionic-angular";
import {Storage} from "@ionic/storage";
import * as CryptoJS from 'crypto-js';

/*
  Generated class for the SQLiteDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export abstract class DatabaseProvider {

  abstract decryptData(): Promise<any>;

  abstract encryptData(): Promise<any>;

  abstract verifyCredentials(email: string, password: string): Promise<boolean>;

  abstract createUser(user: User): Promise<boolean>;

  abstract resetPassword(password: string): Promise<any>;

  abstract getUser(): Promise<User | null>;

  abstract getAccounts(): Promise<any>;

  abstract addAccount(user: object, account: object): Promise<any>;

  abstract addTransaction(transaction: Transaction): Promise<boolean>;

  abstract addBill(bill: object): Promise<any>;

  abstract updateTransaction(id: number, transaction: Transaction): Promise<boolean>;

  abstract updateBill(): Promise<any>;

  abstract payBill(): Promise<any>;

  abstract getTransactionHistory(): Promise<Transaction[]>;

  abstract getBills(): Promise<any>;

  abstract exportData(accountid: number): Promise<Transaction[]>;

  abstract importData(): Promise<any>;

  abstract getCategories(): Promise<Category[]>;

  abstract addCategory(name: string): Promise<boolean>;

  abstract getSpendingChartData(startDate: Date, endDate: Date): Promise<Array<{ date: Date, amount: number }>>;

  abstract getCategoryChartData(startDate: Date, endDate: Date): Promise<Array<{ name: string, amount: number }>>;
}


@Injectable()
export class SQLiteDatabaseProvider extends DatabaseProvider {

  getCategoryChartData(startDate: Date, endDate: Date): Promise<Array<{ name: string; amount: number }>> {
    let sql = "SELECT SUM(amount) as total, name FROM transactions LEFT OUTER JOIN category ON transactions.category = category.code WHERE date <= ? and date >= ? GROUP BY name ;";
    return this.db.executeSql(sql, [endDate.getTime(), startDate.getTime()]).then(value => {
      let result = [];
      for (let i = 0; i < value.rows.length; i++) {
        let item = value.rows.item(i);
        result.push({name: item.name, amount: item.total});
      }
      console.log(JSON.stringify(result));
      return result;
    });
  }

  getSpendingChartData(startDate: Date, endDate: Date): Promise<Array<{ date: Date; amount: number }>> {
    let sql = "SELECT SUM(amount) as total, datetime(date/1000, 'unixepoch', 'start of day') as day FROM transactions WHERE date >= ? and date <= ? GROUP BY day;";
    if (!startDate || !endDate || endDate.getTime() < startDate.getTime()) {
      console.log("Invalid graph dates");
      return new Promise<Array<{ date: Date, amount: number }>>(resolve => resolve([]));
    }

    return this.db.executeSql(sql, [startDate.getTime(), endDate.getTime()])
      .then(value => {
        let result = [];
        for (let i = 0; i < value.rows.length; i++) {
          let item = value.rows.item(i);
          console.log(item.day);
          let d = new Date(item.day);
          result.push({date: d, amount: item.total});
        }
        console.log("Graph results");
        return result;
      }, reason => {
        console.log(reason);
        return reason;
      });

  }

  /**
   * Gets the catagories from the database.
   * @returns {Promise<Category[]>}
   */
  getCategories(): Promise<Category[]> {
    return this.db.executeSql("SELECT code, name FROM category;", [])
      .then(value => {
        let c = Array<Category>();
        for (let i = 0; i < value.rows.length; i++) {
          let item = value.rows.item(i);
          c.push(new Category(item.code, item.name));
        }
        return c;
      }, reason => {
        console.log(reason);
        return reason;
      });
  }

  /**
   * Inserts a category into the database.
   * @param {string} name
   * @returns {Promise<boolean>}
   */
  addCategory(name: string): Promise<boolean> {
    let sql = "INSERT INTO category (name) VALUES (?)";
    return this.db.executeSql(sql, [name])
      .then(value => {
        return value.rowsAffected == 1;
      }, reason => {
        console.log(reason);
        return false;
      })
  }

  createUser(user: User): Promise<boolean> {
    return this.storage.ready().then(value => {
      let hash = CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex);
      user.password = hash;
      return this.storage.set("user", user);
    })
  }

  getUser(): Promise<User | null> {
    return this.storage.ready().then(value => {
      return this.storage.get("user").then(value2 => {
        return value2;
      })
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
    return this.getUser().then(value => {
      if (value) {
        let hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        return email === value.email && value.password === hash;
      }
      return false;
    })
  }

  getAccounts(): Promise<Account[]> {
    return this.db.executeSql("SELECT * FROM account", []).then(value => {
      let ac = Array();
      for (let i = 0; i < value.rows.length; i++) {
        let row = value.rows.item(i);
        let a = new Account(row.id, row.type, row.balance, row.currency, row.name);
        ac.push(a);
      }
      return ac;
    });
  }

  addAccount(user: object, account: Account): Promise<boolean> {
    let sql = "INSERT INTO account(type, balance, name) VALUES (?, ?, ?)";
    return this.db.executeSql(sql, [account.type, account.balance, account.name])
      .then(value => {
        return value.rowsAffected == 1;
      });
  }

  addTransaction(transaction: Transaction): Promise<boolean> {
    let sql = "INSERT INTO transactions (amount, currency, date, description, account, category, type) VALUES (?, ?, ?, ?, ?, ?, ?);";
    let getBalance = "SELECT balance FROM account WHERE id = ?";
    let updateBalance = "UPDATE account SET balance = ? WHERE id = ?";

    console.log(JSON.stringify(transaction));

    if (transaction.account == null || transaction.category == null) {
      return new Promise<boolean>(resolve => resolve(false));
    }

    return this.db.executeSql(sql, [transaction.amount, transaction.currency, transaction.date.getTime(), transaction.description, transaction.account, transaction.category.id, transaction.type])
      .then(value => {
        console.log(JSON.stringify(value));
        return this.db.executeSql(getBalance, [transaction.account]);
      }).then(value => {
        let b = value.rows.item(0).balance;
        b = b + transaction.amount;
        return this.db.executeSql(updateBalance, [b, transaction.account]);
      })
      .then(value => {
        return value.rowsAffected == 1;
      })
      .catch(reason => {
        console.log(JSON.stringify(reason));
        return false;
      });
  }

  addBill(bill: object): Promise<any> {
    return undefined;
  }

  updateTransaction(id: number, transaction: Transaction = null): Promise<boolean> {
    let sql = "UPDATE transactions SET amount = ?, currency = ?, description = ?, account = ?, category = ?, type = ? WHERE id = ?;";
    return this.db.executeSql(sql, [transaction.amount, transaction.currency, transaction.description, transaction.account, transaction.category.id, transaction.type, id])
      .then(value => {
        return value.rowsAffected == 1;
      }, reason => {
        console.log(reason);
        console.log(JSON.stringify(reason));
        return false;
      });
  }

  updateBill(): Promise<any> {
    return undefined;
  }

  payBill(): Promise<any> {
    return undefined;
  }

  /**
   * Gets the transactions in the database.
   * @returns {Promise<Transaction[]>}
   */
  getTransactionHistory(): Promise<Transaction[]> {
    let sql = "SELECT t.id, amount, t.currency as currency, date, description, account, t.type as type, code, c.name as catName, a.name as acctName FROM transactions t LEFT OUTER JOIN category c ON t.category = c.code LEFT OUTER JOIN account a ON a.id = t.account ORDER BY date DESC;";
    return this.db.executeSql(sql, {})
      .then(value => {
        //console.log(JSON.stringify(value));
        let t = [];
        for (let i = 0; i < value.rows.length; i++) {
          let item = value.rows.item(i);
          //console.log(JSON.stringify(item));
          let d = new Date();
          d.setTime(item.date);
          let trans = new Transaction(
            item.id, item.amount, item.currency, d, item.description, item.account, item.catName, item.code, item.type
          );
          trans.accountName = item.acctName;
          t.push(trans);
        }
        //console.log(JSON.stringify(t));
        return t;
      });
  }

  getBills(): Promise<any> {
    return undefined;
  }

  exportData(accountid: number): Promise<Transaction[]> {

    let sql = "SELECT t.id, amount, t.currency as currency, date, description, account, t.type as type, code, c.name as catName, a.name as acctName FROM transactions t LEFT OUTER JOIN category c ON t.category = c.code LEFT OUTER JOIN account a ON a.id = t.account WHERE t.account = ? ORDER BY date DESC;";
    return this.db.executeSql(sql, [accountid])
      .then(value => {
        console.log(JSON.stringify(value));
        let t = [];
        for (let i = 0; i < value.rows.length; i++) {
          let item = value.rows.item(i);
          console.log(JSON.stringify(item));
          let d = new Date();
          d.setTime(item.date);
          let trans = new Transaction(
            item.id, item.amount, item.currency, d, item.description, item.account, item.catName, item.code, item.type
          );
          trans.accountName = item.acctName;
          t.push(trans);
        }
        console.log(JSON.stringify(t));
        return t;
      });
  }

  importData(): Promise<any> {
    return undefined;
  }

  db: SQLiteObject;

  constructor(private platform: Platform, private sqlite: SQLite, private storage: Storage) {
    super();
    platform.ready().then(value => {
      // this.accountInfo = new UserInfo(this.storage);
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
  }

  private createTables(dbobj) {
    return dbobj.executeSql(
      'CREATE TABLE IF NOT EXISTS account (\n' +
      '  id       INTEGER PRIMARY KEY,\n' +
      '  name   TEXT,\n' +
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
          '    ON UPDATE CASCADE,\n' +
          '    CONSTRAINT cat FOREIGN KEY (category) REFERENCES category(code) ON DELETE SET NULL ON UPDATE CASCADE\n' +
          ');', {}));
  }
}
