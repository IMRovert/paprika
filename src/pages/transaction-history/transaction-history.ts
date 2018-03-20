import {Component} from '@angular/core';

import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {Transaction} from "../../models/transaction";
import {DatabaseProvider} from "../../providers/database/database";

@IonicPage()
@Component({
  selector: 'page-transaction-history',
  templateUrl: 'transaction-history.html'
})
export class TransactionHistoryPage {
  transList: Transaction[];
  accList: Account[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider) {
    this.transList = [];
    this.accList = [];
    this.db.getTransactionHistory().then(value => {
      console.log(value);
      this.transList = value;
    });
    this.db.getAccounts().then(value => {
      console.log(value);
      this.accList = value;
    });

  }

  itemTapped($event, item: Transaction) {
    this.navCtrl.push('EditTransactionPage', {
      transaction: item
    });
  }

  addTransaction() {
    this.navCtrl.push('EditTransactionPage');
  }
}
