
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExportPage } from './export';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    ExportPage,
  ],
  imports: [
    IonicPageModule.forChild(ExportPage),
  ],
  providers: [
    File, HTTP
  ]
})
export class ImportPageModule {}
