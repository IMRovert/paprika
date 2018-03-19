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
  icons: string[];
  transList: Transaction[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider) {
    this.icons = ['log-in', 'log-out'];
    this.transList = [];
    this.db.getTransactionHistory().then(value => {
      console.log(value);
      this.transList = value;
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
