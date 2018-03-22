import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {LoginPage} from "../pages/login/login";
import {LoginPageModule} from "../pages/login/login.module";
import {RegisterPageModule} from "../pages/register/register.module";
import {ProfilePageModule} from "../pages/profile/profile.module";
import {DatabaseProvider, SQLiteDatabaseProvider} from '../providers/database/database';
import {CalendarModule} from "ion2-calendar";
import {TransactionHistoryPageModule} from "../pages/transaction-history/transaction-history.module";
import {TransactionHistoryPage} from "../pages/transaction-history/transaction-history";
import {SQLite} from "@ionic-native/sqlite";
import {IonicStorageModule, Storage} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    RegisterPageModule,
    TransactionHistoryPageModule,
    ProfilePageModule,
    CalendarModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    MyApp,
    TransactionHistoryPage,
  ],
  providers: [
    SQLite,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: DatabaseProvider, useClass: SQLiteDatabaseProvider},
  ]
})
export class AppModule {
}
