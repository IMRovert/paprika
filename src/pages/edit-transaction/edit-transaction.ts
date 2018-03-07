import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {Category} from "../../models/category";
import {Transaction} from "../../models/transaction";

/**
 * Generated class for the EditTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-transaction',
  templateUrl: 'edit-transaction.html',
})
export class EditTransactionPage {

  categories: Category[];
  transaction: Transaction;
  title = "Add Transaction";
  edit = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider, private alertCtrl: AlertController) {
    let transaction = navParams.get("transaction");

    if (transaction) {
      this.transaction = transaction;
      this.title = "Edit Transaction";
      this.edit = true;
    } else {
      this.title = "Add Transaction";
      this.transaction = new Transaction(0, 0, "CDN", new Date().getDate(), "", 0, "", 0, "withdrawal");
    }

  }

  ionViewDidLoad() {
    this.getCategories();
    console.log('ionViewDidLoad EditTransactionPage');
  }

  private getCategories() {
    this.db.getCategories().then(
      value => this.categories = value
    );
  }

  addNewCategory() {
    let alert = this.alertCtrl.create({
      title: 'Add Category',
      inputs: [
        {
          name: 'name',
          placeholder: 'Category Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name) {
              this.db.addCategory(data.name).then(value => {
                this.getCategories();
              })
            }
          }
        }
      ]
    });
    alert.present();
  }


  save() {
    if (this.edit) {
      this.db.updateTransaction(this.transaction.id, this.transaction).then(value => {
        if (value) {
          this.navCtrl.pop();
        }
      })
    } else {
      this.db.addTransaction(this.transaction).then(value => {
        if (value) {
          this.navCtrl.pop();
        }
      })
    }
  }
}
