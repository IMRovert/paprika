import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Chart} from 'chart.js';
import {CalendarModal, CalendarModalOptions, CalendarResult} from "ion2-calendar";

/**
 * Generated class for the GraphsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graphs',
  templateUrl: 'graphs.html',
})
/**
 * Using guide from https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/
 */
export class GraphsPage {

  @ViewChild('histogramCanvas') histogramCanvas;

  histogramChart: any;

  greenBackground = 'rgba(54, 162, 235, 0.2)';
  greenBorder = 'rgba(54, 162, 235, 1)';
  redBackground = 'rgba(255, 99, 132, 0.2)';
  redBorder = 'rgba(255,99,132,1)';

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,) {
  }

  ionViewDidLoad() {
    this.histogramChart = new Chart(this.histogramCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          label: 'Amount spent',
          data: [10, 5, 1, -10, -5, 3, 3],
          backgroundColor: [
            this.greenBackground,
            this.greenBackground,
            this.greenBackground,
            this.redBackground,
            this.redBackground,
            this.greenBackground,
            this.greenBackground
          ],
          borderColor: [
            this.greenBorder,
            this.greenBorder,
            this.greenBorder,
            this.redBorder,
            this.redBorder,
            this.greenBorder,
            this.greenBorder,
            this.greenBorder
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });
  }

  openCalendar() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'RANGE'
    };

    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
      console.log(date);
    });
  }

}
