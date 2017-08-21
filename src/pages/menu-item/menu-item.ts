import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/Rx';


import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';




/**
 * Generated class for the MenuItem page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.*/

@Component({
  selector: 'page-menu-item',
  templateUrl: 'menu-item.html',


})
export class MenuItem {
	ingredients :  any;
	menuitem: any;
	title: '';
  shownGroup = null;
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams ) {
  
  	this.navParams.get('flavor');
  	this.menuitem = this.navParams.get('flavor');
  	//this.ingredients = marked(this.menuitem.ingredients.toString());
  	this.ingredients = this.menuitem.ingredients;
    
  	
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MenuItem' + this.menuitem);
     this.title = this.navParams.get('menuitem');
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }


   toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
      } else {
        this.shownGroup = group;
    }
  };
  
  isGroupShown(group) {
     return this.shownGroup === group;
  };

 
}
