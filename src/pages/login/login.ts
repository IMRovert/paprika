import {Component, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private formBuilder: FormBuilder) {
    this.login = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    })
  }


  ngOnInit(): void {
    this.menu.enable(false);
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
    console.log(this.login.value)
    // Navigate to home page as new root
    this.navCtrl.setRoot('HomePage');
    this.menu.enable(true);
  }
}
