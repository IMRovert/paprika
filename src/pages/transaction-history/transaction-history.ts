import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import {transaction} from "../../models/transaction";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  transList: transaction[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['log-in', 'log-out'];
    this.transList = [
      new transaction(35, 'CAD', 20318, 'Bought two pizzas from the pizza store', 256037, 'Food', 5, 'withdrawal'),
      new transaction(66, 'CAD', 180318, 'bought an overpriced iPhone charger', 256037, 'Extras', 6, 'withdrawal'),
      new transaction(250, 'CAD', 60817, 'inheritance check', 256037, 'Income', 1, 'deposit'),
      new transaction(650, 'CAD', 310118, 'payed rent', 678234, 'Housing', 2, 'withdrawal'),
      new transaction(22.44, 'CAD', 40414, 'beer pong supplies', 678234, 'Extras', 6, 'withdrawal')
    ];

    this.items = [];
    for(let i = 0; i < this.transList.length; i++) {
      this.items.push({
        title: this.transList[i].amount.toString() + ((this.transList[i].type == 'deposit')? " +":" -"),
        note: this.transList[i].description,
        icon: ((this.transList[i].type == 'deposit')? this.icons[0]:this.icons[1])
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
