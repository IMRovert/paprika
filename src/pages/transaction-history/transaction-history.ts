import {Component, OnInit} from '@angular/core';

import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Account} from "../../models/account";
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
  accList: Account[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider) {
    this.transList = [];
    this.accList = [];
  }

  ionViewWillEnter(): void {
    this.db.getTransactionHistory().then(value => {
      console.log(value);
      this.transList = value;
    }).catch(reason => {
      console.log(reason);
    });
    this.db.getAccounts().then(value => {
      console.log(value);
      this.accList = value;
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

  addAccount() {
    this.navCtrl.push('AddAccountPage').catch(reason => console.log(reason));
  }
}
