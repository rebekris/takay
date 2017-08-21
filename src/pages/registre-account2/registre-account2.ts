import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import { RegistreAccount3Page } from '../registre-account3/registre-account3';
import { TAKAYPage } from '../t-akay/t-akay'

import { Message } from '../../providers/message';
import { RestService } from '../../providers/rest-service';

import { LoginPage } from '../login/login';
import { TabsControllerPage } from '../tabs/tabs';
@Component({
  selector: 'page-registre-account2',
  templateUrl: 'registre-account2.html'
})
export class RegistreAccount2Page {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  data:'';
  email:'';
  passw:'';
  address={
    name:'billing',
    address:'',
    zip_code:'',
    phone:'',
    
  }
  user: any;
  store: Storage = new Storage(localStorage);
  

constructor(public navCtrl: NavController, public navParm: NavParams, private rest: RestService, public msj: Message) {
    
  }
  ionViewWillEnter(){
    this.data = this.navParm.get('data');
    this.email = this.navParm.get('email');
    this.passw = this.navParm.get('passw');
  }
  goToRegistreAccount3(params){
    if (!params) params = {};
    //this.navCtrl.push(RegistreAccount3Page);
  }
  signUp(){
    let self = this;
    console.log("Direccion: "+ self.address);

    self.rest.saveUser(self.data, self.address).subscribe(
      result =>{
        if(result){
          
          console.log("Usuario guardado", result)
          self.user = result;

        }
      },
      err=>{
        self.msj.showLoading();
          self.msj.showMsj(err);
        console.error(err);
      },
      ()=>{
        console.log("send data completed", self.user.customer.email, self.user.customer.password)
        self.msj.showLoading();
        self.login(self.user.customer.email, self.user.customer.password);
      }
      );
    //this.msj.showLoading();
    //this.msj.showMsj("Please, login to continue");   

    //this.navCtrl.setRoot(TAKAYPage);

    //para recargar una pagina this.navCtrl.setRoot(this.navCtrl.getActive().component);
    console.log(this.address, this.data);

    


  }

  login(email, passw){
    let self = this;
    self.rest.getUser(email, passw).subscribe(
      result => {
        if (result.id){
          self.msj.showLoading();
            self.store.set('token', result.name),
            self.store.set('user', result)            
          self.msj.showMsj("Welcome "+result.name);
          self.store.ready().then(()=>{
          });
          
          self.navCtrl.setRoot(TabsControllerPage);
        }
        else{
         self.navCtrl.setRoot(LoginPage); 
        }
      });

  }

}
