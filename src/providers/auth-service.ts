import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
 

@Injectable()
export class AuthService {
  token=0;
  currentUser : any;
 

  public login(credentials, userList){
    
    for(let user of userList){
      if( user.email == credentials.email.toLowerCase() && user.password == credentials.password ){
        this.currentUser = user;
      //  this.token = user.id;
      //  console.log(this.token +'==='+ this.currentUser.email);
        return this.currentUser;

      }
    }
    return 0;

  }
 
 
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
 
  
}