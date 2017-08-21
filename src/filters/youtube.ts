import { Injectable, Pipe } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
/*
  Generated class for the Youtube pipe.
  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'youtube'
})
@Injectable()
export class Youtube {
	video: SafeResourceUrl;

  constructor(private domSanitizer: DomSanitizer){}

  transform(value, args) {
  	this.video = this.domSanitizer.bypassSecurityTrustResourceUrl(value);
    return this.video;
  }
}