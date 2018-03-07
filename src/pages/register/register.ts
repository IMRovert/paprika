import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private register: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private db: DatabaseProvider, public menu: MenuController) {
    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      verifyPass: ['', Validators.required],},
    {validator: this.matchingPasswords('password','verifyPass')});
    }


    matchingPasswords(passwordKey: string, confirmPasswordKey: string)
    {
      return (group: FormGroup): { [key: string]: any } => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
          return {
            mismatchedPasswords: true
          };
        }
      }
  }


// TODO: Use FormBuilder for validation and unit testing.
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signUp() {
    //TODO: Handle register
    console.log(this.register.value)
    let user = new User(this.register.controls["name"].value,this.register.controls["password"].value, this.register.controls["email"].value);
    this.db.createUser(user).then(value => {
      this.navCtrl.setRoot('HomePage');
      this.menu.enable(true);
    })
  }

}
