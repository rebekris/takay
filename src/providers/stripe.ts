import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//import { Stripe } from '@ionic-native/stripe';
import { Storage } from '@ionic/storage';
//import stripePackage from 'stripe';


declare var Stripe;


/*
  Generated class for the Stripe provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MyStripe {
	//stripe = Stripe('pk_test_nzrVZmplAUuOcq93DOC1mtFN');
	
	
	
	store: Storage = new Storage(localStorage);
	CUSTOMER_ID;
	cardinfo:any={
		//object: 'card',
		expMonth: 12,
		expYear: 2020,
		number: '4242424242424242',
		cvc: '100'
	}
 	stripe = Stripe("pk_test_nzrVZmplAUuOcq93DOC1mtFN");
 	elements = this.stripe.elements();
 	card = this.elements.create('card');

  constructor(private platform: Platform) {
    console.log('Hello Stripe Provider');
    
   
  }

  goToPay(){
  	this.card.mount("#card-number");

	this.stripe.createToken(this.card).then(function(result){
		console.log(result);
	});

  /*
 	
 	stripe.createSource(card)
  	.then(token => console.log("Token: "+token))
  	.catch(error => console.error("Error de token: "+error));*/

  }
}


  /*goToPay(){
  	let self = this;
  	var stripe = new Stripe()//"stripe")("sk_test_I9eROQziiyu76umh9xzzQoeG");

//  	('stripe')('sk_test_I9eROQziiyu76umh9xzzQoeG');
  	stripe.setPublishableKey('pk_test_nzrVZmplAUuOcq93DOC1mtFN');

  	/*stripe.customer.createSource(
	  "cus_B680Oy7YfVXP43",
	  { source: "tok_amex" },
	  function(err, card) {
	    // asynchronously called
	  }
	);*/


  	
/*
  	stripe.createCardToken(this.cardinfo)
  	.then(token => console.log("Token: "+token))
  	.catch(error => console.error("Error de token: "+error));
  }*/
  

  	//this.stripe.setPublishableKey('my_publishable_key');
  /*	self.stripe.setPublishableKey('pk_live_WagHtxCQtIOLpHPifayD00sg');
    self.stripe.customer.create({
    	email: user.email
    }).then(function(customer){
    	return self.stripe.customers.createSource(customer.id,{
    		source: this.cardinfo
    	})
    }).then(function(source){
    	return self.stripe.charges.create({
    		amount: plan,
    		currency: 'usd',
    		customer: source.customer

    	});
    }).then(function(charge){

    }).then(function(err){});
  	*/

  	
  	/*this.stripe.createCardToken(this.cardinfo).then((token)=>{
  		var data = 'stripetoken='+token+'&amount=50';
  		var headers = new Headers();
  		headers.append('Content-Type','applications/x-www-form-urlencoded');
  		this.http.post('', data, {headers: headers}).subscribe((res)=>{
  			if(res.json().success){
  				alert('transaction succefull');
  			}
  		})*/
  

  
  