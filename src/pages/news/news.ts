import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
	post: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	//this.navParams.get('item');
  	this.post = this.navParams.get('item');

  }

  ionViewDidLoad() {
	this.post = this.navParams.get('item');  	
  }

  
}
