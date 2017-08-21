import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { TAKAYPage } from '../t-akay/t-akay';
import { MenuPage } from '../menu/menu';
import { HomePage } from '../home/home';
import { SuscriptionPage } from '../suscription/suscription';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = MenuPage;
  tab3Root: any = SuscriptionPage;
  tab4Root: any = ProfilePage;
  constructor(public navCtrl: NavController) {
  }
  
}
