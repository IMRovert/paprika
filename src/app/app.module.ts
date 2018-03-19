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
import {AddTransactionPageModule} from "../pages/add-transaction/add-transaction.module";
import {DatabaseProvider, SQLiteDatabaseProvider} from '../providers/database/database';
import {InMemoryDatabaseProvider} from "../providers/database/inMemoryDatabase";
import {CalendarModule} from "ion2-calendar";
import {TransactionHistoryPageModule} from "../pages/transaction-history/transaction-history.module";
import {TransactionHistoryPage} from "../pages/transaction-history/transaction-history";
import {SQLite} from "@ionic-native/sqlite";

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
    AddTransactionPageModule,
    IonicModule.forRoot(MyApp)
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
