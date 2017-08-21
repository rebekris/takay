import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import * as $ from 'jquery';
import { RegistreAccount2Page } from '../registre-account2/registre-account2';

import { RestService } from '../../providers/rest-service';
import { Message } from '../../providers/message';

@Component({
  selector: 'page-registre-account',
  templateUrl: 'registre-account.html'
})
export class RegistreAccountPage {
  
  reg={
    name: '',
    last_name:'',
    email:'',
    passw: '',
    confirm_pass:'',
    coupon:'',
    country:'',
    city:'',
  }
  countries:any;
  cities: any;
  testRadioOpen: false;
  testRadioResult: any;
  
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public rest: RestService, public msj: Message, public alertCtrl: AlertController) {
    this.getCountry();
    
    console.log(this.getCountry());
  }

  signUp(){
    var self=this;
   if(self.reg != null){
     if(self.reg.passw !=  self.reg.confirm_pass){
       self.msj.showLoading();
       self.msj.showError("Passwords don't match!");         
       //self.reg.passw='';
     }
     else{
      console.log(self.reg);
      self.navCtrl.push(RegistreAccount2Page,{
        data : this.reg
      });
      console.log("Usuario guardado");
       
     }
      
    }
    //this.rest.saveUser(this.reg, 'customer').finally(()=>{}).subscribe();
  }

  getCountry(){
    let self= this;
    self.rest.get('country').subscribe(
        result => {
          self.countries=result.countrys;
          
        },
        err =>{console.error("Error : "+err);} ,
        () => {console.log('getData completed');});

      
  }

  getCity(country){
    console.log("Country Selected: " + country.id);
    let self= this;
    self.rest.get('country/'+country.id).subscribe(
        result => {
          self.cities=result.country.city;
          
        },
        err =>{console.error("Error : "+err);} ,
        () => {console.log('getData completed');});
    
  }


  goToRegistreAccount2(params){
    if (!params) params = {};
    this.navCtrl.push(RegistreAccount2Page,{
      'email': this.reg.email,
      'passw': this.reg.passw

    });
  }

  doCountry(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Country');
    $.each($(this.countries),function(index,country){      
      alert.addInput({
        type: 'radio',
        label: country.name,
        value: country,
        checked: false
      });
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        if(data){
          this.testRadioOpen = false;
          this.testRadioResult = data.id;
          this.reg.country = data.id;
          console.log('Select a Pais:', this.reg.country);
          this.getCity(data);
          $('#country').html('<span class="button-inner"> '+data.name+'</span> ');          
          $('#city').html('<span class="button-inner"> Select city </span> ');          
        }else{
          this.msj.showLoading();
          this.msj.showError('Select a country');
          $('#country').html('<span class="button-inner"> Select country</span> ');          
        }
         
      }
    });
    alert.present();
  }

  doCity(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Select a City');
    $.each($(this.cities),function(index,city){      
      alert.addInput({
        type: 'radio',
        label: city.name,
        value: city,
        checked: false
      });
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('city:', data.name, data.id);
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.reg.city = data.id;
        //console.log('Select a Ciudad:', this.reg.city);
        $('#city').html('<span class="button-inner"> '+data.name+' </span>');
        console.log(this.reg);
      }
    });
    alert.present();
  }


  
}
