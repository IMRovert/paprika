import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {Account} from "../../models/account";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the AddAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-account',
  templateUrl: 'add-account.html',
})
export class AddAccountPage {

  account: Account;

  errorMsg: string;

  accForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider, private fb: FormBuilder) {
    this.account = new Account(0, "Savings", 0, 'CDN', "");
    this.buildForm();
  }

  private buildForm(){
    this.accForm = this.fb.group(
      {
        name: this.fb.control(this.account.name, Validators.required),
        balance: this.fb.control(this.account.balance, Validators.required),
        type: this.fb.control(this.account.type, Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAccountPage');
  }

  addAccount() {
    this.db.getUser().then(value => {
      return this.db.addAccount(value, this.account)
    }).then(value => {
      return this.navCtrl.pop();
    }).catch(reason => {
      console.log(reason);
      this.errorMsg = "Unable to create account";
    })
  }

}
