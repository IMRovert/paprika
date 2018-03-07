import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GraphsPage} from './graphs';
import {CalendarModule} from "ion2-calendar";

@NgModule({
  declarations: [
    GraphsPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphsPage),
    CalendarModule,
  ],
})
export class GraphsPageModule {
}
