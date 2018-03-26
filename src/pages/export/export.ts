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
  transList: Transaction[];
  transaction: Transaction;
  accounts: Account[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File, public plat : Platform, private db: DatabaseProvider, private http : HTTP, private formBuilder: FormBuilder,  private alertCtrl: AlertController) {

    this.transList = [];

    this.exportFile = this.formBuilder.group({
      accountname: ['', Validators.required],
      fileName: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExportPage');

    this.db.getAccounts().then(value => {
      this.accounts = value;
    })

    this.db.getTransactionHistory().then(value => {
      console.log(value);
      this.transList = value;
    }).catch(reason => {
      console.log(reason);
    });
  }



  readFile() {
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
        let items = [""];



          this.transaction = new Transaction(0, Number(items[0]), "CDN", new Date(), items[1], 0, items[2], 0, items[3]);




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
