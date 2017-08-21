import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Recommend } from './recommend';

@NgModule({
  declarations: [
    Recommend,
  ],
  imports: [
    IonicPageModule.forChild(Recommend),
  ],
  exports: [
    Recommend
  ]
})
export class RecommendModule {}
