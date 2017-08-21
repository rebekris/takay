import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Coupon } from './coupon';

@NgModule({
  declarations: [
    Coupon,
  ],
  imports: [
    IonicPageModule.forChild(Coupon),
  ],
  exports: [
    Coupon
  ]
})
export class CouponModule {}
