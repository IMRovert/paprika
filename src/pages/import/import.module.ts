import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportPage } from './import';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    ImportPage,
  ],
  imports: [
    IonicPageModule.forChild(ImportPage),
  ],
   providers: [
    File, HTTP
  ]
})
export class ImportPageModule {}
