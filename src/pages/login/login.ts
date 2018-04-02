import {Component, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatabaseProvider} from "../../providers/database/database";
import {TransactionHistoryPage} from "../transaction-history/transaction-history";
import {User} from "../../models/user";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  private login: FormGroup;
  private errorMessage: string;
  private user: Promise<User | null>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menu: MenuController, private formBuilder: FormBuilder, private db: DatabaseProvider) {
    this.navCtrl = navCtrl;
    this.login = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    })
  }


  ngOnInit(): void {
    this.menu.enable(false);
    this.user = this.db.getUser();
  }

  //TODO: Use FormBuilder for the form

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToRegister() {
    this.navCtrl.push('RegisterPage');
  }

  signIn() {
    console.log("test");
    // TODO: Real Login code to check credentials

    this.db.verifyCredentials(this.login.get('email').value, this.login.get('password').value)
      .then(value => {
        if (value) {
          this.errorMessage = "";
          console.log("Valid Login");
          console.log(this.navCtrl);
          this.navigateToTransactionHistory();
        } else {
          this.errorMessage = "Invalid username or password";

        }
      })
      .catch(reason => {
        console.log(JSON.stringify(reason));
      });
  }

  navigateToTransactionHistory() {
    // Navigate to home page as new root
    this.navCtrl.setRoot('TransactionHistoryPage').then(
      value => {
        this.menu.enable(true);
      }
    );
  }
}
