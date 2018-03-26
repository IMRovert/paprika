import { Component } from '@angular/core';
import {Platform} from 'ionic-angular';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../models/account";
import {Transaction} from "../../models/transaction";
import {DatabaseProvider} from "../../providers/database/database";
import {Category} from "../../models/category";
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ImportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-export',
  templateUrl: 'export.html',
})
export class ExportPage {
  private exportFile: FormGroup;
  categories: Category[];
  transaction: Transaction;
  accounts: Account[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File, public plat : Platform, private db: DatabaseProvider, private http : HTTP, private formBuilder: FormBuilder,  private alertCtrl: AlertController) {

    /* checkFile(path, file);
     createFile(path, file, false);
     writeExistingFile(file, path, line)


     this.file.readFile(
     */

    this.exportFile = this.formBuilder.group({
      accountname: ['', Validators.required],
      fileName: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExportPage');
    this.getCategories();

    this.db.getAccounts().then(value => {
      this.accounts = value;
    })
  }

  private getCategories() {
    this.db.getCategories().then(
      value => this.categories = value
    );
  }


  compareCat(e1: Category, e2: Category) {
    return e1.id === e2.id;
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
    //console.log(this.importFile.value);
    let testdata;
    this.http.get('ExportFiles/' + this.exportFile.value.fileName + '.csv', {}, {}).then((data) => {
        //console.log(data);
        testdata = "" + data.data;
        //let message = "";
        //console.log('Data successfully imported to Account:\nAccount Name: ' + this.importFile.value.accountname + ' Imported From File: ' + this.importFile.value.fileName)
        //message = message + 'Data successfully imported to Account:\nAccount Name: ' + this.importFile.value.accountname + '    Imported From File: ' + this.importFile.value.fileName;
        //message = message + '\nCurrency: ' + this.importFile.value.currency + '    Balance: ' + this.importFile.value.balance;
        //console.log('The following tuples have been read from file: ')

        //console.log(testdata)
        //console.log(typeof testdata);
        //let fileText = "Date,Amount,Payee,Desc\n09-12-24,550.0,Trevor,Making Bank Yo\n09-07-06,200.55,Russell,#Dolla";
        let lines = testdata.split("\n");
        let items = [""];
        let headers = lines[0].split(",");
        for(var i = 1; i < lines.length;i++) {
          //console.log(lines[i]);
          items = lines[i].split(",");
          let tuple = '';
          //tuple = tuple + headers[j] + ": " + items[j] + ' ';



          this.transaction = new Transaction(0, Number(items[0]), "CDN", new Date(), items[1], 0, items[2], 0, items[3]);

          let catExists = false;
          for(var m = 0; m < this.categories.length; m++) {
            if(this.categories[m].name == items[3]) {
              catExists = true;

            }

          }

          if(catExists === false) {

            this.db.addCategory(items[3]).then(value => {
              this.getCategories();

            })

          }
          for(var l = 0; l < this.categories.length; l++) {
            if(this.categories[l].name == items[3]) {
              this.transaction.category = this.categories[l];

            }


            this.db.addTransaction(this.transaction).then(value => {
              if (value) {
                this.navCtrl.pop();
              }
            })


          }
        }

      }
    ).catch((err) => {console.log("File read error: " + err.toString());
      alert("Error: The file specified does not exist")});



    /*let fileText = "Date,Amount,Payee,Desc\n09-12-24,550.0,Trevor,Making Bank Yo\n09-07-06,200.55,Russell,#Dolla";
    let lines = testdata.split("\n");
    let items = [""];
    let headers = lines[0].split(",");
    /*for(var k = 0;k < headers.length;k++) {
      console.log(headers[k]);
    }
    for(var i = 1; i < lines.length;i++) {
      console.log(lines[i]);
      items = lines[i].split(",");
      for(var j = 0; j < items.length;j++) {
        console.log(headers[j] + ": " + items[j]);
        this.transaction = new Transaction(0, 0, "CDN", new Date(), "", 0, "", 0, items[0]);
      };


    }; */
    /*Insert Items into database
    * */



  }

}
