import {Component, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
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
  goToImport() {
    this.navCtrl.push('ImportPage');
  }

  login() {
    console.log("teset");
    // TODO: Real Login code to check credentials

    // Navigate to home page as new root
    this.navCtrl.setRoot('HomePage');
    this.menu.enable(true);
  }
}
