import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import {RegistreAccount3Page} from '../registre-account3/registre-account3';



//import { SuscriptionPage } from '../suscription/suscription';


/**
 * Generated class for the OrderSummary page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-summary',
  templateUrl: 'order-summary.html',
})
export class OrderSummary {
	store: Storage = new Storage(localStorage);
	plan_name='';
	plan_blend:any;
	plan_delv='';
	plan:any;
  flavors: any;
  user: any;
  iva = "0.14";
  to_iva:any;
  to_pay: any;
	day:any;
  hour: any;
  address:any;
  pay_out: false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSummary');
    this.loadData();

  }

  ionViewWillEnter(){
    this.store.get('pay_out').then((val)=>{
      if(val){
        this.pay_out = val;
        console.log(this.pay_out);
      }
    });
  }

  next(){
   this.navCtrl.push(RegistreAccount3Page,{
     'to_pay' : this.to_pay,
   });
  }

  loadData(){
    this.store.get('plan').then((val)=>{
      if(val){
        this.plan = val;
        this.plan_name = val.translation.en.name;
        this.plan_blend= val.priceBlend;

        this.plan_delv = val.priceDelivery;
    
        /*let price = parseFloat(this.plan_delv);
        let tax = (price / parseFloat(this.iva)).toFixed(2);
        
        this.to_iva = tax;
        this.to_pay = price + parseFloat(tax);*/
      }
    });

    this.store.get('flavors').then((val)=>{
      if(val){
        this.flavors = val;
      }
    });
    this.store.get('delivery').then((val)=>{
      if(val){
        
        this.day= val.day;
        this.hour = val.hour;
        this.address = val.address;
        console.log(this.day);
      }
    });

    this.store.get('user').then((val)=>{
      if(val){
        this.user = val;
      }
    });
  }

}
