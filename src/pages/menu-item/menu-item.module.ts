import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuItem } from './menu-item';

@NgModule({
  declarations: [
    MenuItem,
  ],
  imports: [
    IonicPageModule.forChild(MenuItem),
  ],
  exports: [
    MenuItem
  ]
})
export class MenuItemModule {}
