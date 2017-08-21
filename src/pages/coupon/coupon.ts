import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestService } from '../../providers/rest-service';

//import * as $ from 'jquery';
/**
 * Generated class for the Coupon page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html',
})
export class Coupon {
	user_data:any; 
	user_coupon:any;
	coupon_list: any;

	coupon={
		user_id:'',
		used_coupon:'',
	}

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Coupon');
  	this.user_data=this.navParams.get('user_data');
  	console.log(this.user_data.id);
  	this.getdata(this.user_data.id);
  	/*$.each($(this.coupon_list),function(index,item){			
			let coupon.push(parseInt($(item).val()));
			console.log(this)
		});*/
  	
  	console.log("Coupon:"+this.coupon_list);
  	//this.coupon.user_id=this.user_data.id
  }
  ionViewWillLoad(){
  }

  getdata(user_id){
	
		//get the list of menu
	this.rest.get('customer/'+user_id).subscribe(
	    result => {
	    	console.log("Result:"+result.customer.usedCoupon);
	    	this.user_coupon = result.customer.usedCoupon;
		},
	    err =>{console.error("Error : "+err);} ,
	    () => {console.log('getData completed');}
	);

	this.rest.get('coupon').subscribe(
	    result => {
	    	console.log("Result:"+result.coupons);
	    	this.coupon_list = result.coupons;
		},
	    err =>{console.error("Error : "+err);} ,
	    () => {console.log('getData completed');}
	);
	 
	 }
	 /*getCouponName(couponId){
	 	let name;
	 	console.log("Cupon: "+couponId);
	 	this.rest.get('coupon/'+couponId).subscribe(
	    result => {
	    	//this.coupon_list=result.coupon.name;
	    	console.log(result.coupon.name);
	    	name= result.coupon.name;
		},
	    err =>{console.error("Error : "+err);} ,
	    () => {console.log('getData completed');}
	);
	return name;
	    	

	 }*/



	 saveUsedCoupon(coupon){
	 	

	 }



}
