import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Chart} from 'chart.js';
import {CalendarModal, CalendarModalOptions, CalendarResult} from "ion2-calendar";
import moment from 'moment';
import {DatabaseProvider} from "../../providers/database/database";

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
  @ViewChild('categoryCanvas') categoryCanvas;

  histogramChart: any;
  categoryChart: any;

  dateRange: { from: Date; to: Date; };

  greenBackground = 'rgba(54, 162, 235, 0.2)';
  greenBorder = 'rgba(54, 162, 235, 1)';
  redBackground = 'rgba(255, 99, 132, 0.2)';
  redBorder = 'rgba(255,99,132,1)';

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private db: DatabaseProvider) {
    this.dateRange = {from: null, to:null};
    this.dateRange.from = moment().add(-7, "days").toDate();
    this.dateRange.to = moment().toDate();
  }

  ionViewDidLoad() {
    this.getSpendingChart();
    this.getCategoryChart();
  }

  openCalendar() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      canBackwardsSelected: true,
      title: 'Select a date range'
    };

    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();
    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
      this.dateRange = {from: date.from.dateObj, to: date.to.dateObj};
      this.getSpendingChart();
      this.getCategoryChart();
    });
  }

  private getSpendingChart() {
    this.db.getSpendingChartData(this.dateRange.from, this.dateRange.to).then(value => {
      this.formatSpendingChart(value);
    }).catch(reason => {
    });
  }

  private getCategoryChart() {
    this.db.getCategoryChartData(this.dateRange.from, this.dateRange.to).then(value => {
      this.formatCategoryChart(value);
    });
  }

  private formatSpendingChart(data: Array<{ date: Date, amount: number }>) {

    let amounts = [];
    let dates = [];
    data.forEach(value => {
      amounts.push(value.amount);
      dates.push(moment(value.date).format("MMM D"))
    });

    this.histogramChart = new Chart(this.histogramCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
          label: 'Amount spent',
          data: amounts,
          backgroundColor: this.greenBackground,
          borderColor: this.greenBorder,
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

  private formatCategoryChart(data: Array<{ name: string; amount: number }>) {
    let labels = [];
    let amounts = [];
    let colors = [];

    data.forEach(value => {
      labels.push(value.name);
      amounts.push(value.amount);
      colors.push(this.getRandomColor());
    });


    this.categoryChart = new Chart(this.categoryCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Percentage by category',
          data: amounts,
          backgroundColor: colors
        }]
      }

    });
  }

  /**
   * Generate a random color
   * https://stackoverflow.com/a/1484514
   * @returns {string}
   */
  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
