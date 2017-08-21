import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestService } from '../../providers/rest-service';
/**
 * Generated class for the Faq page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class Faq {
	faqs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestService) {
  	this.getdata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Faq');
  }
  getdata(){

    this.rest.get('support').subscribe(
      result => {
        this.faqs=result.supports;
        //this.imgPath= result.flavors.image.Folder.rel_path;
        console.log("Success : "+ this.faqs + " -----" );
      },
      err =>{
        console.error("Error : "+err);
      } ,
      () => {
        console.log('getData completed');
      }
    );
  }

}
