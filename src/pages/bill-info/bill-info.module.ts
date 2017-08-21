import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillInfo } from './bill-info';

@NgModule({
  declarations: [
    BillInfo,
  ],
  imports: [
    IonicPageModule.forChild(BillInfo),
  ],
  exports: [
    BillInfo
  ]
})
export class BillInfoModule {}
