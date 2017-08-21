import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';


import { TAKAYPage } from '../pages/t-akay/t-akay';
import { TabsControllerPage } from '../pages/tabs/tabs';
//import { LoginPage } from '../pages/login/login';
//import { MenuPage } from '../pages/menu/menu';
//import { RegistreAccountPage } from '../pages/registre-account/registre-account';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
//  rootPage:any = TAKAYPage;
  //rootPage:any = LoginPage;
 // rootPage:any = MenuPage;
    //rootPage:any = RegistreAccountPage;
    //rootPage:any = TabsControllerPage;

    rootPage: any;
    store: Storage = new Storage(localStorage);
   //public _app: App;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, store: Storage) {

    this.store.get('token').then(val=>{
      if (val){
        this.rootPage = TabsControllerPage;
       }else{
         this.rootPage= TAKAYPage;
       }

    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      setTimeout(()=>{
        splashScreen.hide();
        
      }, 100);
      statusBar.styleDefault();
    });


        
  }




}
