import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';

import { Storage } from '@ionic/storage';


import 'rxjs/Rx';
//import { LoadNew } from '../../providers/load-new'
import { RestService } from '../../providers/rest-service';
import { SuscriptionPage } from '../suscription/suscription';
import { NewsPage } from '../news/news';





//import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  //homePage:any = TabsPage;

  newsData: any;
  loading: any;
  videoUrl:any;
  store: Storage = new Storage(localStorage);

  constructor(public navCtrl: NavController, public http: Http, public rest: RestService) {
    
    this.getdata();
    this.store.get('token').then((val)=>{
      console.log("Usuario conectado " + val);
    });
    
        

  }
  doRefresh(refresher){
       setTimeout(() => {
         console.log('Async operation has ended');
         this.getdata();
         refresher.complete();
       }, 2000);
    }



  getdata(){
    this.rest.get('post').subscribe(
      result => {
        this.newsData=result.posts;
        console.log("Success News: "+this.newsData);},
      err =>{
        console.error("Error : "+err);
      } ,
      () => {
        console.log('getData completed');
      }
    );

    this.rest.get('video/1').subscribe(
      result => {
        this.videoUrl=result.video.url;
        console.log("Success Video: "+this.videoUrl);},
      err =>{
        console.error("Error : "+err);
      } ,
      () => {
        console.log('getData completed');
      }
    );
   
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        //this.newsData.push( this.newsData.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }







  
  goToSuscription(params){
    if (!params) params = {};
    this.navCtrl.push(SuscriptionPage);
  }

  goToNew(item){
    //if (!params) params = {};

    this.navCtrl.push(NewsPage, {
      item : item
    });
  }






}
