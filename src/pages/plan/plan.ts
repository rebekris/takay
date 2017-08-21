import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';

import { Storage } from '@ionic/storage';
import { RestService } from '../../providers/rest-service';


/**
 * Generated class for the Plan page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html',
})
export class PlanPage {
	plans: any;
  id_selected=0;

	store: Storage = new Storage(localStorage);

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestService) {
  	
  	

  }

  getPlanList(){
  	this.rest.get('plan').subscribe(
      result => {
        this.plans=result.plans;

        console.log("Success : "+ this.plans + " -----" );
      },
      err =>{
        console.error("Error : "+err);
      } ,
      () => {
        console.log('getData completed');
      }
    );
  }


  savePlan(event,plan){
  	
  	console.log("save plan: "+plan.quantity, plan.translation.en.name, plan.id, plan.planToken);
  	
    	if($('#'+plan.id+'.state').hasClass('uncheck') ){
    		$('.state').addClass('uncheck').removeClass('check');
    		$('#'+plan.id+'.state').addClass('check').removeClass('uncheck');
    		this.store.ready().then(()=>
            this.store.set('plan', plan),
            );
    	}else{
    		$('#'+plan.id+'.state').addClass('uncheck').removeClass('check');
    		this.store.remove('plan');
    	}


  }

  goBack(){
  	//this.navCtrl.push(SuscriptionPage);
    this.navCtrl.pop();
    

  	this.store.get('plan').then((val)=>{
  		console.log("Cant seleccionada: " + val);
  	});
  }

  ionViewWillUnload(){
    //this.navCtrl.first();
    this.store.get('plan').then((val)=>{
      if(val){
        //$('#'+val.id+'.state').addClass('check').removeClass('uncheck');
        this.id_selected = val.id;
        console.log("UNLOAD Cant seleccionada al iniciar: " + val.id);
        
      }
    });
   // this.goBack();
  }

  ionViewDidLoad() {
    this.getPlanList();
    this.store.get('plan').then((val)=>{
      if(val){
        this.id_selected = val.id;
        //$('#'+val.id+'.state').addClass('check').removeClass('uncheck');
        console.log("Cant seleccionada al iniciar: " + val.id);
        
      }
    });
    this.store.get('token').then((val)=>{
      console.log("Usuario conectado " + val);
      
    });
    
  }

}
