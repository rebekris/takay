import {Pipe} from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'mediaPath'
})
export class MediaPipe {

  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value, args?) {
  	//console.log(value, value.Folder.rel_path);
    // ES6 array destructuring
    let url = 'http://takay.h4o-studio.com/uploads/';
	//let url = "http://takay.127.0.0.1.xip.io:8080/uploads/";
    if(value){
	   return  url+value.Folder.rel_path+ "/"+value.file;
    	
    }else{
    	return  url+"defaultmedia.jpg";
    }
  }

}