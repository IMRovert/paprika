
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExportPage } from './export';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';

import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

  @NgModule({
  declarations: [
    ExportPage,
  ],
  imports: [
    IonicPageModule.forChild(ExportPage),
  ],
  providers: [
    File, HTTP, FileChooser, FilePath
  ]
})
export class ImportPageModule {}
