import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerateCoupon } from './generate-coupon';

@NgModule({
  declarations: [
    GenerateCoupon,
  ],
  imports: [
    IonicPageModule.forChild(GenerateCoupon),
  ],
  exports: [
    GenerateCoupon
  ]
})
export class GenerateCouponModule {}
