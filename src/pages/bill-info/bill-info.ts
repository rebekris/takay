import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { RestService } from '../../providers/rest-service';

import {Address} from '../address/address';



/**
 * Generated class for the BillInfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bill-info',
  templateUrl: 'bill-info.html',
})
export class BillInfo {
	store: Storage = new Storage(localStorage);
	user:any;
	address: any;
user_id;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,  public rest: RestService) {
  	
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad BillInfo');
    let self = this;
    self.store.get("user").then((val)=>{
      if(val){
        self.user_id=val.id;
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
  goToAddress(){
    console.log(this.user_id);
    this.navCtrl.push(Address,{
      'user_id': this.user_id
    });
  }
/*
  edit(event){
    $('input').prop('readonly',false);
    $('.named').removeClass('hidden');
    $('.named input').focus();
    $('.save').removeClass('hidden');
    $('.edit').removeClass('visible').addClass('hidden');
    console.log(this.new_address.customer_id);
  }

  save(event){
    let self = this;
    $('input').prop('readonly',true);
   //$('.named').addClass('hidden').removeClass();
    $('.save').removeClass('visible').addClass('hidden');
    console.log(self.new_address);
    $('.edit').removeClass('hidden');
    /*
    self.rest.addAddress(self.new_address).subscribe(
      result => {
        if(result){
          console.log("Direccion Guardada" + result);
        }
      },
      err =>{console.error("Error : "+err);} ,
      () => {console.log('getData completed');}
     ); 

  }
     */

  /*addAddress(name, address, phone, zip_code, user_id ){
    let self= this;
    self.new_address={
      'name' : name,
      'address': address,
      'zip_code': zip_code,
      'phone': phone,
      'user_id': user_id
    }
    self.rest.addAddress(direction).subscribe(
      result => {
        if(result){
          console.log("Direccion Guardada" + result);
        }
      },
      err =>{console.error("Error : "+err);} ,
      () => {console.log('getData completed');}
     ); 

  }*/


    

}
