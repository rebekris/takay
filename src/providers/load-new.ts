import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoadNew provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
  

  Rutas de extraccion de datos


*/
@Injectable()
export class LoadNew {
  //items: Observable<Array<any>>

  constructor(public http: Http) {
    console.log('Hello LoadNew Provider');
  }
  getJsonData(){
	  return this.http.get('https://www.reddit.com/r/gifs/top/.json?limit=2&sort=hot').map(res => res.json());
	}
	getJsonMenu(){
	  return this.http.get('http://takay_js.192.168.0.107.xip.io:8080/menu.php').map(res => res.json());
	}
	getJsonMenuItem(){
	  return this.http.get('http://takay_js.192.168.0.107.xip.io:8080/menu.php').map(
	  	res => res.json().id);
	}
  getJsonUser(){
    return this.http.get('http://takay_js.192.168.0.107.xip.io:8080/user.php').map(res => res.json());
  }

	



}
