import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { RegistreAccountPage } from '../registre-account/registre-account';

@Component({
  selector: 'page-t-akay',
  templateUrl: 't-akay.html'
})
export class TAKAYPage {
  // this tells the tabs component which Pages
  //// should be each tab's root Page
  store: Storage = new Storage(localStorage);
  constructor(public navCtrl: NavController) {
    this.store.remove('user_new');

  }
  goToLogin(){
    
    this.navCtrl.push(LoginPage);
  }
  createAccount() {
    this.navCtrl.push(RegistreAccountPage);
    
  }
  
}
