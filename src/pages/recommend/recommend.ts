import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
import { RestService } from '../../providers/rest-service';
/**
 * Generated class for the Recommend page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recommend',
  templateUrl: 'recommend.html',
})
export class Recommend {
	user;
	store: Storage = new Storage(localStorage);
	coupon:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private rest: RestService, private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Recommend');

    this.user = this.navParams.get('user_name');
  }


  ionViewWillEnter(){
  	let self = this;
  	self.store.get('user').then((val)=>{
  		if(val){
  			//self.coupon = val.coupon; 
  			console.log(val);
  			self.rest.get("customer/"+val.id).subscribe(
  				result => {
		          self.coupon = result.customer.coupon;
		          console.log("Success : "+ self.coupon[0].name + " -----" );
		        },
		        err =>{console.error("Error : "+err);} ,
		        () => {console.log('getData completed');}
  			);
  		}
  	});
  }

  share(){
  	let self= this;
  	let description = self.user + " has given you a FREE Takay Blend. To claim your free ready-to-blend superfood meal, enter the promo code " + self.coupon[0].name + " on your first purchase.";

  	this.socialSharing.share(description, 'Takay Blend','', ' Find more at www.takayblends.com').then(function() {
	  console.log('Successful share');
	}).catch(function(error) {
	  console.log('Error sharing:', error)
	})

     

  }

}
