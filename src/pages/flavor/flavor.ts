import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/Rx';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage';


import { RestService } from '../../providers/rest-service';
import { Message } from '../../providers/message';


/**
 * Generated class for the FlavorPage page.

 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-flavor',
  templateUrl: 'flavor.html',
})

export class FlavorPage {
  	menulist: any;
  	memory_flavor:any;
  	qty=0;

  	qty_total_store=0;
  	store: Storage = new Storage(localStorage);

  	constructor(public navCtrl: NavController, public http: Http, public rest: RestService, public msj: Message) {
  	

	}

	saveData(){		
		let toSave = $.map($('input'), function(item, index){
			let $it = $(item);
			let r = {
				id: parseInt($it.attr('id')),
				name: $it.attr('name'),
				quantity: parseInt($it.val())
			};
			if (r.quantity >0 && r.quantity !=0)
			{
				return r;
			}
		});
		console.log(toSave);
		if(toSave){
			this.store.ready().then(()=>{
				this.store.set('flavors', toSave)
			}
			);
			
		}
	}
	ionViewWillLeave(){
		this.saveData();
		
	}

ionViewDidLeave(){
	this.saveData();
	/*this.store.get('flavors').then((val)=>{
		console.log(val);
	});*/
	//this.navCtrl.first();
}

ionViewDidLoad() {
	console.log("second Did Load");

	
	//this.getdata();
}
ionViewUnload(){
	
}

ionViewWillEnter() {
	console.log("first Will Enter");
	console.log(this.memory_flavor);
	this.getdata();
	/*this.store.get('flavors').then((val)=>{
	    if(val){
		    this.memory_flavor= val;
		    //this.qty=0;
		    $.each(this.memory_flavor, function(index, item){
				console.log("Will Enter: "+item.name, item.quantity, item.id);
				$('input[type=text]#'+item.id).val(item.quantity);

			});
		}
	});*/
	}
ionViewDidEnter(){
	console.log("Did Enter");
	
}
getTotalSelected(item){
		let subt = [];
		let qty = 0;
		
		$.each($('input'),function(index,item){			
			subt.push(parseInt($(item).val()));
		});
		let result = subt.reduce(function(total,item){
			return total+item;
		});
		qty=this.qty_total_store-result;
		if (this.qty_total_store-result >=0)
		{
			this.qty=qty;
			
		}
		else{


			$(event.target).val(
				$(event.target).val()-1
			);
		}
	}

add(event, item ){
	let x = parseInt($('input[type=text]#'+item.id).val());
	if(this.qty >0){
		let qty_total = x + 1; 
		$('input[type=text]#'+item.id).val(qty_total);

		this.getTotalSelected(item);
		console.log(qty_total);		
	}
	else{
		console.log("enought");
		this.msj.showLoading();
		this.msj.showMsj("It's Enought!");
	}
}
remove($event, item){
	let qty = parseInt($('input[type=text]#'+item.id).val())-1;
	if(qty > 0){
		$('input[type=text]#'+item.id).val(qty);
		this.getTotalSelected(item);		
	}else{
		this.msj.showLoading();
		this.msj.showError("The amount can not be less than 0");
		$('input[type=text]#'+item.id).val('0');
	}

	console.log(qty);
}

getdata(){
	this.store.get('plan').then((val)=>{
		if(val){
			this.qty_total_store=val.quantity;
			this.qty=val.quantity;
		}
  	});
		//get the list of menu
	this.rest.get('flavor').subscribe(
	    result => {this.menulist=result.flavors;
		},
	    err =>{console.error("Error : "+err);} ,
	    () => {console.log('getData completed');}
	);
	 
	 }
	 //console.log(this.memory_flavor);
	 getQuantity(memory_flavor, flavor_list){
	 	if(memory_flavor){
	 		if (memory_flavor.id == flavor_list.id){
				return memory_flavor.quantity
			}
	 	}else{
	 		return 0;
	 	}

	 	
	 }
	 	
	 

}



