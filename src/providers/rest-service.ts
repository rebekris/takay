import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RestService {

  //public url_img = "http://takay.h4o-studio.com/uploads";

 //public url_base = "http://takay.127.0.0.1.xip.io:8080";
  public url_base = "http://takay.h4o-studio.com";
  public url_img = this.url_base+"/uploads";

  public pedido:any;

	public headers = new Headers();
  public options;

  constructor(public http: Http) {
    //console.log('Hello RestService Provider');
    this.headers.append('Dm-Api-Key', 'qwerty');
    this.headers.append('Content-Type', 'application/json');
    //this.headers.append('Access-Control-Allow-Origin', '*');
    this.options = new RequestOptions({ headers: this.headers });
    //{ headers: this.headers }
  }

  get(module){
  	let url = this.url_base+"/api/"+module;
  	let res=this.http.get(url, this.options).map(
  		res => res.json());
  	console.log("actually url: "+ url);
  	return res;
  }

  getUser(email, password){
    //let url = "http://takay.h4o-studio.com/customer/security/login";
    let url = this.url_base+"/customer/security/login";
    let res = this.http.post(url, {'email': email, 'password': password}).map(
      res=> res.json());
    return res;
  }

  saveUser(user_data, address){
    let res = JSON.stringify({
      'customer_data': user_data,
      'address': [address]
    });
    //console.log("Datos para DMP: "+res);
    let url = this.url_base+'/api/customer';
    let user = this.http.post(url, res, this.options).map(res=>res.json());

    return user;
  }

  saveCard(cu_token, card_token){
    console.log(cu_token, card_token);
    
    let res = JSON.stringify({
      'customer': cu_token,
      'card': card_token,
    });

    let url = this.url_base+'/customer/card/add';
    
    let card = this.http.post(url, res, this.options).map(res=>res.json());
    return card;

  }

 saveSuscription(user, plan, flavor, delivery){
    //let suscriptionLine =  JSON.stringify(flavor);
    let res = JSON.stringify({
      'customer': user,
      'plan': plan,
      'is_active': 'true',
      'delivery': delivery.day + " - " + delivery.hour +" at " + delivery.address,
      'suscriptionLine': flavor 

    });
    console.log(res)
    //let url = 'http://takay.127.0.0.1.xip.io:8080/api/suscription';
    let url = this.url_base+'/api/suscription';
    let susc = this.http.post(url, res, this.options).map(res=> res.json());

    return  susc;
  }

  addAddress(new_address){
    /*let direction={
      'name' : name,
      'address': add,
      'zip_code': zip_code,
      'phone': phone,
      'user_id': user_id,
    }*/
    let res = JSON.stringify({
      'address': new_address 
    });
    let url = this.url_base+'/api/address';
    let address = this.http.post(url, res, this.options).map(res=> res.json());

    return  address;

    
  }



  /*sendSuscription(user, plan){
    console.log(user);
    let res = JSON.stringify({
      'customer_token': user,
      'plan_token' : plan
    });

    let url_stripe = this.url_base+'/suscription/plan/add';
    //let url_stripe = 'http://takay.127.0.0.1.xip.io:8080/suscription/plan/add';
    let pay = this.http.post(url_stripe, res, this.options).map(res=>{res.json();console.log(res)});
    
    return pay

  }*/
}
    /*
    let url = this.url_base+'/suscription';
    let res = this.http.post(url, {
      //'customer_id': user.id,
      'plan_id': plan.id,
      'is_active': 'true',
      'delivery': delivery,
      'suscriptionLine': {
        'id': flavor.id,
        'title': flavor.name,
        'quantity': flavor.quantity
      },
    }).map(
    res=> res.json());
*/
     
/*
     myMuscribe(tmp){
       tmp.subscribe(
      result => {
        if(result){
          console.log("guardado");
          
        }
      },
      err =>{console.error("Error : "+err);} ,
      () => {console.log('getData completed');}
      );
     }
*/
   



