import {Component} from '@angular/core';

import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {Transaction} from "../../models/transaction";

@IonicPage()
@Component({
  selector: 'page-transaction-history',
  templateUrl: 'transaction-history.html'
})
export class TransactionHistoryPage {
  icons: string[];
  transList: Transaction[];
  items: Array<{ title: string, note: string, icon: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['log-in', 'log-out'];
    this.transList = [
      new Transaction(35, 'CAD', 20318, 'Bought two pizzas from the pizza store', 256037, 'Food', 5, 'withdrawal'),
      new Transaction(66, 'CAD', 180318, 'bought an overpriced iPhone charger', 256037, 'Extras', 6, 'withdrawal'),
      new Transaction(250, 'CAD', 60817, 'inheritance check', 256037, 'Income', 1, 'deposit'),
      new Transaction(650, 'CAD', 310118, 'payed rent', 678234, 'Housing', 2, 'withdrawal'),
      new Transaction(22.44, 'CAD', 40414, 'beer pong supplies', 678234, 'Extras', 6, 'withdrawal')
    ];

    this.items = [];
    for (let i = 0; i < this.transList.length; i++) {
      this.items.push({
        title: this.transList[i].amount.toString() + ((this.transList[i].type == 'deposit') ? " +" : " -"),
        note: this.transList[i].description,
        icon: ((this.transList[i].type == 'deposit') ? this.icons[0] : this.icons[1])
      });
    }
  }

  // itemTapped(event, item) {
  //   this.navCtrl.push(ItemDetailsPage, {
  //     item: item
  //   });
  // }
  itemTapped($event, item: Transaction) {

  }
}
