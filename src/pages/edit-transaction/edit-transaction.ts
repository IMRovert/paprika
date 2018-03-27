import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {Category} from "../../models/category";
import {Transaction} from "../../models/transaction";
import {Account} from "../../models/account";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  accounts: Account[];
  amount = 0;

  withdraw = '1';

  transactionForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider, private alertCtrl: AlertController, private fb: FormBuilder) {
    let transaction = navParams.get("transaction");

    if (transaction) {
      this.transaction = transaction;
      this.title = "Edit Transaction";
      this.edit = true;
      this.amount = Math.abs(transaction.amount);
    } else {
      this.title = "Add Transaction";
      this.transaction = new Transaction(0, 0, "CDN", new Date(), "", 1, "", null, "withdrawal");
    }

    this.buildForm();

  }

  private buildForm() {
    if (!this.edit) {
      this.transactionForm = this.fb.group(
        {
          amount: this.fb.control(this.transaction.amount, Validators.required),
          account: this.fb.control(this.transaction.account, Validators.required),
          description: this.fb.control(this.transaction.description, Validators.required),
          category: this.fb.control(this.transaction.category, Validators.required),
          type: this.fb.control('0', Validators.required)
        });
    } else {
      this.transactionForm = this.fb.group(
        {
          description: this.fb.control(this.transaction.description, Validators.required),
          category: this.fb.control(this.transaction.category, Validators.required)
        });
    }
  }

  ionViewDidLoad() {
    this.getCategories();
    console.log('ionViewDidLoad EditTransactionPage');
    this.db.getAccounts().then(value => {
      this.accounts = value;
    })
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
    if (!this.edit) {
      if (this.transactionForm.controls['type'].value == '1') {
        this.transaction.amount = Math.abs(this.transactionForm.controls['amount'].value) * -1;
      } else {
        this.transaction.amount = Math.abs(this.transactionForm.controls['amount'].value);
      }
      this.transaction.account = this.transactionForm.controls['account'].value;
    }
    this.transaction.description = this.transactionForm.controls['description'].value;
    this.transaction.category = this.transactionForm.controls['category'].value;

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

  compareCat(e1: Category, e2: Category) {
    return e1.id === e2.id;
  }
}
