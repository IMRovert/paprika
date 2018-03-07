import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {Category} from "../../models/category";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider, private alertCtrl: AlertController) {
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
}
