import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the Message provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Message {
	loading: Loading;
	

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController ) {
    console.log('Hello Message Provider');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Ups!',
      subTitle: text,
      buttons: ['Try again?']
    });
    alert.present(prompt);
  }

  showMsj(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Takay:',
      subTitle: text,
      buttons: ['done']
    });
    alert.present(prompt);
  }

  showNotice(text) {
    this.loading.dismiss(); 
    let alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: text,
      buttons: ['ok']
    });
    alert.present(prompt);
  }

}
