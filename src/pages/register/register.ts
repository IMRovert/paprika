import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

// TODO: Use FormBuilder for validation and unit testing.
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    //TODO: Handle register
  }

}
