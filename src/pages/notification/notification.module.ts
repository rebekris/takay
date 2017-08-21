import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Notifications } from './notification';

@NgModule({
  declarations: [
    Notification,
  ],
  imports: [
    IonicPageModule.forChild(Notifications),
  ],
  exports: [
    Notifications
  ]
})
export class NotificationsModule {}
