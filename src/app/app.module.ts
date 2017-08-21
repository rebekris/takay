import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'
import { IonicStorageModule } from '@ionic/storage';
import { Stripe } from '@ionic-native/stripe';
import { SocialSharing } from '@ionic-native/social-sharing';

//import {NgRestAdapterServiceProvider} from "angular-rest-adapter";

//Providers
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LoadNew } from './../providers/load-new';
import { AuthService } from './../providers/auth-service';
import { Message } from './../providers/message';
import { RestService } from '../providers/rest-service';
import { MyStripe } from '../providers/stripe';

import { MyApp } from './app.component';

//Pages
import { TAKAYPage } from '../pages/t-akay/t-akay';
import { MenuPage } from '../pages/menu/menu';
import { SuscriptionPage } from '../pages/suscription/suscription';
import { ProfilePage } from '../pages/profile/profile';
import { TabsControllerPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { RegistreAccountPage } from '../pages/registre-account/registre-account';
import { RegistreAccount2Page } from '../pages/registre-account2/registre-account2';
import { RegistreAccount3Page } from '../pages/registre-account3/registre-account3';
import { NewsPage } from '../pages/news/news';
import { LoginPage } from '../pages/login/login';
import { MenuItem } from '../pages/menu-item/menu-item';
import { PlanPage } from '../pages/plan/plan';
import { OrderSummary } from '../pages/order-summary/order-summary';
import { FlavorPage } from '../pages/flavor/flavor';
import { DeliveryPage } from '../pages/delivery/delivery';
import { BillInfo } from '../pages/bill-info/bill-info';
import { Faq } from '../pages/faq/faq';
import { Feedback } from '../pages/feedback/feedback';
import { Recommend } from '../pages/recommend/recommend';
import { Address } from '../pages/address/address';
import { Notifications } from '../pages/notification/notification';
import { Coupon } from '../pages/coupon/coupon';

//Pipes
import { MediaPipe } from '../filters/media-path';
import { Markdown } from '../filters/markdown';
import { Youtube } from '../filters/youtube';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//import { ExpandableComponent } from '../components/expandable/expandable';




  
@NgModule({
  declarations: [
    MyApp,
    TAKAYPage,
    MenuPage,
    SuscriptionPage,
    ProfilePage,
    TabsControllerPage,
    HomePage,
    RegistreAccountPage,
    RegistreAccount2Page,
    RegistreAccount3Page,
    NewsPage,
    LoginPage,
    MenuItem,
    BillInfo,
    Faq,
    Feedback,
    Recommend,
    Address,
    Notifications,
    PlanPage,
    MediaPipe,
    Markdown,
    Youtube,
    FlavorPage,
    OrderSummary,
    DeliveryPage,
    Coupon,
    

    
//    ExpandableComponent,

    //NgRestAdapterServiceProvider

  ],
  imports: [
    BrowserModule,
    HttpModule,
    //Stripe,
    //NgRestAdapterServiceProvider,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TAKAYPage,
    MenuPage,
    SuscriptionPage,
    ProfilePage,
    TabsControllerPage,
    HomePage,
    RegistreAccountPage,
    RegistreAccount2Page,
    RegistreAccount3Page,
    NewsPage,
    LoginPage,
    MenuItem,
    BillInfo,
    Faq,
    Feedback,
    Recommend,
    Address,
    Notifications,
    PlanPage,
    FlavorPage,
    OrderSummary,
    DeliveryPage,
    Coupon,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoadNew,
    AuthService,
    Message,
    RestService,
    Stripe,
    SocialSharing,
    MyStripe,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})



export class AppModule {
}
    