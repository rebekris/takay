import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as $ from 'jquery';
//import accordion from 'angular-ui-bootstrap/src/accordion';
//import { UIBootstrap } from 'angular-ui-bootstrap';

import { Storage } from '@ionic/storage';
import { RestService } from '../../providers/rest-service';


@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  testRadioOpen: false;
  testRadioResult: any;

	store: Storage = new Storage(localStorage);
	schedules : any;
	days = [
		{name:'Monday', data:1},
		{name:'Tuesday', data:2},
		{name:'Wednesday', data:3},
		{name:'Thursday', data:4},
		{name:'Friday', data:5},
		{name:'Saturday', data:6},
		{name:'Sunday', data:7},
		
	];
  hour = [
    {name:'9:00 - 12:00', data:1},
    {name:'13:00 - 18:00', data:2}
    
  ];
	
  select_delivery={
    day:'',
    hour:'',
    address:''
  }


  user_id;
  address:any;



	
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestService, public alertCtrl: AlertController) {
  	
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Delivery');
   
  }
  ionViewWillEnter(){
    let self = this; 
    self.store.get('user').then((val)=>{
      if(val){
        self.user_id=val.id;
        console.log("ID del Usuario: "+self.user_id);
        self.rest.get('customer/'+val.id).subscribe(
            result => {
              self.address = result.customer.address;
              self.store.ready().then(()=>
                self.store.set('address', result),
                );
              console.log("Success : "+ self.address + " -----" );
            },
            err =>{console.error("Error : "+err);} ,
            () => {console.log('getData completed');}
          );
      }
    });
    
  }
 

  getDay(event, day){    
    this.select_delivery.day = day;
    console.log(day);
    //<ion-list [id]=d.name class="acordeon" >
    if($('#'+day+'.state').hasClass('uncheck') ){
        $('.state').addClass('uncheck').removeClass('check');
        $('.acordeon').addClass('hidden').removeClass('visible');
        $('#'+day+'.state').addClass('check').removeClass('uncheck');
        $('#'+day+'.acordeon').addClass('visible').removeClass('hidden');
        //this.store.ready().then(()=>
            //this.store.set('plan', plan),
          //  );
      }else{
        $('#'+day+'.state').addClass('uncheck').removeClass('check');
        $('#'+day+'.acordeon').addClass('hidden').removeClass('visible');
        //this.store.remove('plan');
      }



    //transition-timing-function: ease-in;

  }
  getHour(event, hour){
    this.select_delivery.hour = hour.name;
    console.log(this.select_delivery.hour); 
  }

  saveDelivery(){
    let self= this;
  	console.log("grabando "+self.select_delivery.day, self.select_delivery.hour);
    //let del = this.select_day + " - " + this.select_hour;
  	self.store.ready().then(()=>
          self.store.set('delivery', self.select_delivery)
     );
    self.store.get('delivery').then((val)=>{
      if(val){
        console.log("Guardado: "+val.day);
      }
      
    });
    //this.navCtrl.push(SuscriptionPage);
    
  }


  ionViewWillLeave(){
    this.saveDelivery();//this.navCtrl.last();

  }

  save(){
    this.saveDelivery();//this.navCtrl.last();
    this.navCtrl.pop();
  }

  doAddress(){
    let self=this;
    let alert = this.alertCtrl.create();
    alert.setTitle('Select an Address');
     $.each($(self.address),function(index,ad){      
      alert.addInput({
        type: 'radio',
        label: ad.name,
        value: ad,
        checked: false
      });
    });
     alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        //console.log('city:', data.name, data.id);
        self.testRadioOpen = false;
        self.testRadioResult = data;
        self.select_delivery.address= data.address;
        //self.reg.city = data;
        console.log('Select a Delivery:', self.select_delivery.address);
        $('#city').html('<span class="button-inner"> '+data.name+' </span>');
        
      }
    });
    alert.present();


  }


 

	


}
