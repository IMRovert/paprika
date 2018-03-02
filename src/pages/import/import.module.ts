import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportPage } from './import';
/* import { File } from '@ionic-native/file'; */

@NgModule({
  declarations: [
    ImportPage,
  ],
  imports: [
    IonicPageModule.forChild(ImportPage),
  ],
  /* providers: [
    File
  ] */
})
export class ImportPageModule {}
