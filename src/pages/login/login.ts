import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { TabsControllerPage } from '../tabs/tabs';

import { LoadNew } from '../../providers/load-new';
import { AuthService } from '../../providers/auth-service';
import { Message } from '../../providers/message';

import { RestService } from '../../providers/rest-service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  userList : any;
  userToken ='';
  currentuser = { email: '', password: '' };
  store: Storage = new Storage(localStorage);

 

  constructor(public navCtrl: NavController, public http: Http, public loadNew: LoadNew, public auth: AuthService, public msj: Message, public rest: RestService) {
    

  }

  ionViewWillEnter() {
    this.store.get('token').then((val) => {
        if(typeof val !== 'undefined' && val !== null){
            this.userToken = val;

           console.log(this.userToken);

        }
    });      
  }
 
 
  public login() {
    var self=this;
    this.rest.getUser(this.currentuser.email.toLowerCase(), this.currentuser.password).subscribe(
      result => {
        if (result){
          self.store.get('user').then((val)=>{
          console.log('Ure ID user is: ', val.id)
          if(val.id != result.id){
            self.store.remove('user');
            self.store.remove('token');
            self.store.remove('delivery');
            self.store.remove('plan');
            self.store.remove('flavor');

          }
        });
          self.msj.showLoading();
          self.msj.showMsj("Welcome "+result.name);
          self.store.ready().then(()=>
            self.store.set('token', result.name),
            
           );
          self.store.ready().then(()=>
            self.store.set('user', result),
            );
        self.store.get('user').then((val)=>{
          console.log('Ure ID user is: ', val.id)
        });
        self.navCtrl.setRoot(TabsControllerPage);
      }else{
        self.msj.showLoading();
        self.msj.showError("User or password are wrong");
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

  

  

}