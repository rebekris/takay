import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { AuthService } from '../../providers/auth-service';
import { Message } from '../../providers/message';
import { TAKAYPage } from '../t-akay/t-akay';


import { BillInfo } from '../bill-info/bill-info';
import { Faq } from '../faq/faq';
import { Coupon } from '../coupon/coupon';
import { Feedback } from '../feedback/feedback';
import { Recommend } from '../recommend/recommend';
import { Notifications } from '../notification/notification';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  store: Storage = new Storage(localStorage);
  user: any;
  user_data:any;
  public appCtrl: App;

  
  constructor(public navCtrl: NavController, private auth: AuthService, public app: App, public msj: Message) { 
    this.store.get('token').then((val)=>{
      this.user = val;
    });
    this.store.get('user').then((val)=>{
      if(val){
        console.log(val.id);
        this.user_data = val;
      }
    });

  }
  
  
  public logut() {
    this.msj.showLoading();
    this.store.remove('token');
    
    this.app.getRootNav().setRoot(TAKAYPage);
    //window.location.reload();

    //this.navCtrl.popToRoot();

  }
  public goToFeedback(){
    this.navCtrl.push(Feedback);
  }

  public goToNotification(){
    this.navCtrl.push(Notifications);
  }

  public goToFaq(){
    this.navCtrl.push(Faq);
  }

  public goToBill(){
    this.navCtrl.push(BillInfo);
  }

  public goToRecommend(){
    this.navCtrl.push(Recommend, {
      'user_name': this.user
    });
  }
  public goToCoupon(){
    this.navCtrl.push(Coupon,{
      'user_data': this.user_data
    });
  }


}
