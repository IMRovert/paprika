import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTransactionPage } from './add-transaction';

@NgModule({
  declarations: [
    AddTransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTransactionPage),
  ],
})
export class AddTransactionPageModule {}
