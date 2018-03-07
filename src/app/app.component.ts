import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage: any = LoginPage;
  profilePage = 'ProfilePage';
  graphs = 'GraphsPage';
  importPage = 'ImportPage';
  addTransactionPage = 'AddTransactionPage';
  homePage = HomePage;
  exportPage = 'ExportPage';

  @ViewChild('content') nav: NavController;

  @ViewChild('mainMenu') mainMenu: MenuController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  ngOnInit(): void {
  }

  openPage(page: any) {

    if (page === this.homePage) {
      this.nav.popToRoot();
      this.mainMenu.close();
    } else {
      this.nav.push(page);
      this.mainMenu.close();
    }
  }

  logout() {
    this.nav.setRoot('LoginPage');
    this.mainMenu.close();
  }

}

