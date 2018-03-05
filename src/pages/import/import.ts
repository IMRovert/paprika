import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File, public plat : Platform, private http : HTTP) {

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
    /*console.log("File uploaded");
    var inputFile = document.getElementById("inputfile");
    console.log(inputFile);
    var inputReader = new FileReader();
    inputReader.onload = function(e) {

    }*/
    //inputReader.readAsBinaryString(inputFile.files[0]);
    //let dirname = document.getElementById(accountname);
    //console.log(dirname);
    //this.file.applicationDirectory;
    //this.file.checkDir();
    //File.applicationDirectory;


    //console.log(this.file.applicationDirectory);
    //this.file.readAsText("../../../ImportFiles", "test.txt").then(value => {
    //  console.log(value);
    //}).catch();

    if(this.plat.is('android')) {
      /* Use a fileChooser.open to get file, and assigne to file variable */
    }
    else if(this.plat.is('browser')) {
      /* Get file from HTML form */

    }

    this.http.get('test.txt', {}, {}).then((data) => {
      console.log(data);
    }).catch((err) => {console.log("File read error: " + err)});



    let fileText = "Date,Amount,Payee,Desc\n09-12-24,550.0,Trevor,Making Bank Yo\n09-07-06,200.55,Russell,#Dolla";
    let lines = fileText.split("\n");
    let items = [""];
    let headers = lines[0].split(",");
    /*for(var k = 0;k < headers.length;k++) {
      console.log(headers[k]);
    }*/
    for(var i = 1; i < lines.length;i++) {
      console.log(lines[i]);
      items = lines[i].split(",");
      for(var j = 0; j < items.length;j++) {
        console.log(headers[j] + ": " + items[j]);
      };


    };
    /*Insert Items into database
    * */



  }

}
