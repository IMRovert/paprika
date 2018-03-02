import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/* import { File } from '@ionic-native/file'; */

/**
 * Generated class for the ImportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-import',
  templateUrl: 'import.html',
})
export class ImportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, /*private file: File */ ) {

   /* checkFile(path, file);
    createFile(path, file, false);
    writeExistingFile(file, path, line)


    this.file.readFile(
    */

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportPage');
  }

  readFile() {
    console.log("File uploaded");
    var inputFile = document.getElementById("inputfile");
    console.log(inputFile);
    var inputReader = new FileReader();
    inputReader.onload = function(e) {

    }
    //inputReader.readAsBinaryString(inputFile.files[0]);


  }

}
