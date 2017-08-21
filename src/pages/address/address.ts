import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RestService } from '../../providers/rest-service';
import { Message } from '../../providers/message';

/**
 * Generated class for the Address page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class Address {
	address={
    name:'',
    address:'',
    zipCode:'',
    phone:'',
    customerId:'',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestService, public msj: Message) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Address');
  }
  ionViewWillEnter(){
  	this.address.customerId=this.navParams.get('user_id');
  }

  saveAddress(){
  	let self = this;
  	//console.log(this.address);
  	self.rest.addAddress(self.address).subscribe(
      result => {
        if(result){
          console.log("Direccion Guardada" + result);
        }
      },
      err =>{console.error("Error : "+err);} ,
      () => {console.log('getData completed');}
     );
  	self.msj.showLoading();
  	self.msj.showMsj("Address saved!");
  	this.navCtrl.pop();

  }

}
