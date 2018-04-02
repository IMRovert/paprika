import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportPage } from './import';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';
import { FileChooser } from '@ionic-native/file-chooser';

import { FilePath } from '@ionic-native/file-path';

@NgModule({
  declarations: [
    ImportPage,
  ],
  imports: [
    IonicPageModule.forChild(ImportPage),
  ],
   providers: [
    File, HTTP, FileChooser, FilePath
  ]
})
export class ImportPageModule {}
