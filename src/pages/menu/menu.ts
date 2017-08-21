import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { LoadNew } from '../../providers/load-new';
import { RestService } from '../../providers/rest-service';
import { MenuItem } from '../menu-item/menu-item';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
	menulist: any;
	loading: any;
  imgPath: any;
	//public id_select: 0;
	flavor_selec: any;


  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public http: Http, public loadNew: LoadNew, public rest: RestService) {
  	this.getdata();
    

  }

  getdata(){

    this.rest.get('flavor').subscribe(
      result => {
        this.menulist=result.flavors;
        //this.imgPath= result.flavors.image.Folder.rel_path;
        console.log("Success : "+ this.menulist + " -----" );
      },
      err =>{
        console.error("Error : "+err);
      } ,
      () => {
        console.log('getData completed');
      }
    );
  }

  getImage(item){
    let path = this.rest.url_img+item.photo.Folder.rel_path+ "/"+item.photo.file;
    //console.log(path);
    return path;
  }

  getBenefit(item){
    let benefits: any;
    let id = item.id;
    benefits = item.benefits[0].Translation.en.name;
    console.log(id);
    console.log(benefits);
    return benefits;
  }
 

  goToItem(flavor) {
  	console.log("enviando...: " + flavor.title);
  	this.flavor_selec = flavor;

        this.navCtrl.push(MenuItem, {
        	flavor : flavor
          
        });
    }

    doRefresh(refresher){
       setTimeout(() => {
         console.log('Async operation has ended');
         this.getdata();
         refresher.complete();
       }, 2000);
    }

  
}
