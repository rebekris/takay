import {Pipe} from '@angular/core';
import marked from 'marked';
// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'markdown'
})
export class Markdown {

  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value, args?) {
  	
  	
    // ES6 array destructuring
   return  marked(value);
  }

}