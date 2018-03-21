import {Component, OnInit} from '@angular/core';

import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {Transaction} from "../../models/transaction";
import {DatabaseProvider} from "../../providers/database/database";

@IonicPage()
@Component({
  selector: 'page-transaction-history',
  templateUrl: 'transaction-history.html'
})
export class TransactionHistoryPage implements OnInit {
  icons: string[];
  transList: Transaction[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider) {
    this.icons = ['log-in', 'log-out'];
    this.transList = [];
  }

  ionViewWillEnter(): void {
    this.db.getTransactionHistory().then(value => {
      console.log(value);
      this.transList = value;
    }).catch(reason => {
      console.log(reason);
    });
  }

  ngOnInit(): void {
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
