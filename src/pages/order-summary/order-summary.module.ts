import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderSummary } from './order-summary';

@NgModule({
  declarations: [
    OrderSummary,
  ],
  imports: [
    IonicPageModule.forChild(OrderSummary),
  ],
  exports: [
    OrderSummary
  ]
})
export class OrderSummaryModule {}
