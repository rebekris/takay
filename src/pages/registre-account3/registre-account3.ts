import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { TabsControllerPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { RestService } from '../../providers/rest-service';
import { Message } from '../../providers/message';

import { TabsControllerPage } from '../tabs/tabs';
declare var Stripe;

@Component({
  selector: 'page-registre-account3',
  templateUrl: 'registre-account3.html'
})
export class RegistreAccount3Page {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  // user={
  //   owner:{
  // 	  name:''  ,
  //     email:''
  //   }
    
  // }
  user={
    name:''  ,
    email:''  
  }
  customer:any;
  store: Storage = new Storage(localStorage);
  amount_payable=0;
  plan:any;
  flavors:any;
  delivery:any;


  stripe = Stripe("pk_test_nzrVZmplAUuOcq93DOC1mtFN");
  elements = this.stripe.elements();
  card = this.elements.create('card');
  pay_out= false;



  
  constructor(public navCtrl: NavController, public navParm: NavParams, private rest: RestService, public msj: Message) {
   
    


  }
  ionViewDidLoad() {
    this.card.mount('#card-element');
    this.amount_payable= this.navParm.get('to_pay');
    console.log('Registro de Metodo de pago');
  }
  ionViewWillEnter(){
    this.store.get('flavors').then((val)=>{
      if(val){
       this.flavors = val;   
       console.log("Flavors "+this.flavors);        
      }
    });
    this.store.get('delivery').then((val)=>{
      if(val){
       this.delivery =val;   
       console.log("Delivery "+this.delivery);        
      }
    });
    this.store.get('plan').then((val)=>{
      if(val){
        this.plan = val;
        console.log("Plan "+this.plan);
        
      }
    });
    this.store.get('user').then((val)=>{
      if(val){
        this.user.name = val.name + " " + val.last_name;
        this.user.email = val.email;
        this.customer = val;
        console.log(val, this.customer);
        //this.is_selected_flavor = true;
      }
    });
  }
   
  pay(){
    let self = this;
    let id_card;
    self.stripe.createToken(self.card, self.user).then(function(result){
      if(result){
        id_card= result.token.id;
        console.log("Token: "+ id_card + "  " + self.customer); 
        self.rest.saveCard(self.customer.customer_token, id_card).subscribe(
          result => {
            if(result){
              console.log("Tarjeta Registrada " +result);
              
            }
          },
          err =>{
            console.error("Error : "+err);
          } ,
          () => {
            console.log('getData completed');
            
          }
        );
      }
    });

    self.rest.saveSuscription(self.customer, self.plan, self.flavors, self.delivery).subscribe(
      result => {
        if(result){
          console.log("guardado stripe" + result);
        }
      },
      err =>{console.error("Error : "+err);} ,
      () => {console.log('getData completed');
            self.msj.showLoading();
            self.msj.showMsj("Payout complete! ");
            self.pay_out=true;
           self.store.ready().then(()=>
            self.store.set('pay_out', self.pay_out),
            
           );
    }
     );  

            self.navCtrl.pop();
            self.navCtrl.setRoot(TabsControllerPage);
  }
}
