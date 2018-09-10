import { Component } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent {
  value = '';
  constructor() { }
       
  getFormData() {
    console.log( this.value );
        
    /**
     * Create a new worker instance.
     * @constant worker
     * @type Object
     */
    const worker = new Worker( 'admin/js/workers/worker.js' );
    /**
     * Overwriting onmessage callback for listening to wokrer events.
     * @function onmessage
     * @param {Object} - e
     */
    worker.onmessage = e => {
      console.log('Worker said', this.value);
      console.log('Finished');
    };
    // Post data to worker.
    //1.0.0-alpha is ui version
    worker.postMessage({name: this.value, path: '/1.0.0-alpha/category/add' });
  }
}

