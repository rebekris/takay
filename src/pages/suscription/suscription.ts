import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PlanPage } from '../plan/plan';
import { DeliveryPage } from '../delivery/delivery';
import { FlavorPage } from '../flavor/flavor';

import { OrderSummary } from '../order-summary/order-summary';

import { RestService } from '../../providers/rest-service';



@Component({
  selector: 'page-suscription',
  templateUrl: 'suscription.html'
})
export class SuscriptionPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  store: Storage = new Storage(localStorage);
  is_selected_plan = false;
  is_selected_flavor = false;
  is_selected_delivery=false;
  user: any;
  plan: any;
  flavors: any;
  delivery:any;

  constructor(public navCtrl: NavController, public navPrm: NavParams, private rest: RestService) {
    //this.getStore();
  }

  ionViewWillEnter(){    
    this.getStore();
    console.log("Datos cargados");
  }
  ionViewDidLoad(){
    this.getStore();
  }
  getStore(){
    let selft = this;
    selft.store.get('plan').then((val)=>{
      if(val){
        selft.plan = val;
        console.log("Plan: "+val.planToken);
        selft.is_selected_plan = true;
      }
    });
    selft.store.get('flavors').then((value)=>{
      if(value){
        selft.flavors = value;
        console.log("Flavors: "+value);
        selft.is_selected_flavor = true;
      }

    });

    selft.store.get('delivery').then((val)=>{
      if(val){
        selft.delivery = val;
        console.log("Delivery:" +val.day);
        selft.is_selected_delivery = true;
      }
    });


    selft.store.get('user').then((val)=>{
      if(val){
        selft.user = val;
        console.log("Usuario:" + val.customer_token);
        //selft.is_selected_flavor = true;
      }
    });
  }

  goToPlan(){
    
    this.navCtrl.push(PlanPage);

  }
  goToDelivery(){
    this.navCtrl.push(DeliveryPage);    
  }

  goToFlavor(){
    this.navCtrl.push(FlavorPage);
  }

  goToOrder(){
    this.navCtrl.push(OrderSummary);
  }


  cancelPlan(){
    let self = this;
  	self.store.remove('plan');
    self.store.remove('flavors');    
    self.store.remove('delivery');
    self.store.remove('pay_out');
    
    self.store.ready().then(()=>
    self.store.set('pay_out', 0),);
    self.store.get('flavors').then((val)=>{
      if(val){
        console.log(val);
        self.is_selected_flavor = false
        self.store.remove('flavors');
        
      }
    });
  	
  	this.is_selected_plan = false;
    this.is_selected_flavor = false;
    this.is_selected_delivery = false;
  	//this.navCtrl.push(SuscriptionPage);
  }
  
}






