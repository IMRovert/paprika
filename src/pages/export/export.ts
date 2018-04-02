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

import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

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
  accountid: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File, public plat : Platform, private db: DatabaseProvider, private http : HTTP, private formBuilder: FormBuilder,  private alertCtrl: AlertController, private fch: FileChooser, private filePath: FilePath) {

    this.transList = [];

    this.exportFile = this.formBuilder.group({
      fileName: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExportPage');

    this.db.getAccounts().then(value => {
      this.accounts = value;
    })

  }



  readFile() {

    let testdata;
    //let filechooserurl;

    this.db.exportData(this.accountid).then(transactions => {

      this.transList = transactions
      testdata = "Amount,Description,Category,Type\n";
      for(let i = 0; i < this.transList.length; i++) {
        testdata = testdata + this.transList[i].amount + "," + this.transList[i].description + "," + this.transList[i].category.name + "," + this.transList[i].type + "\n";

      }

      console.log("Transactions exported to File: \n" + testdata);
      alert("Transactions exported: " + testdata);

      //this.fch.open().then(uri => {this.filePath.resolveNativePath(uri).then(url => {filechooserurl = url}).catch((err) => {console.log("File uri error: " + err.toString())})}).catch((err) => {console.log("File native path error: " + err.toString())});

      //this.file.createFile(this.file.externalRootDirectory, this.exportFile.value.fileName, false).catch((err) => {console.log("Error creating filename: " + JSON.stringify(err))});

      this.file.createDir(this.file.externalRootDirectory, "TestFolder", false).catch(err => {console.log("Error creating filename: " + JSON.stringify(err))});
      //this.file.writeExistingFile(this.file.externalRootDirectory, this.exportFile.value.fileName, testdata).catch(err => {console.log("Error writing to File: " + JSON.stringify(err))});

      this.navCtrl.pop();
    }).catch(err => {console.log("Error reading transactions from data base: " + JSON.stringify(err))});
  }

}
