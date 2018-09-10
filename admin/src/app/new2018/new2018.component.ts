import { Component } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'new2018',
  templateUrl: './new2018.component.html',
  styleUrls: ['./new2018.component.css']
})

export class New2018Component  {
  value_title = '';
  value_description = '';
  value_date = '';
  value_new = '';
  constructor() { }

  getData() {
    console.log( this.value_title );
    console.log( this.value_description );
    console.log( this.value_date );
    console.log( this.value_new );

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
    console.log('Worker said', this.value_title);
    console.log('Worker said', this.value_description);
    console.log('Worker said', this.value_date);
    console.log('Worker said', this.value_new);
    console.log('Finished');
  };
  // Post data to worker.
  //1.0.0-alpha is ui version
  worker.postMessage({title: this.value_title,description: this.value_description,time: this.value_date, new: this.value_new, path: '/1.0.0-alpha/new2018/add' });
  }
}
