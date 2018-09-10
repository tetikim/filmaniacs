import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { element } from 'protractor';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  displayedColumns:string[] = [ 'title', 'description', 'time' ];
  movies = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.movies.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(){
    this.movies.sort = this.sort;
    this.movies.paginator = this.paginator;

    /**
     * Create a new worker instance.
     * @constant worker
     * @type Object
     */
    const worker: Worker = new Worker( 'admin/js/workers/worker.js' );

    /**
     * Overwriting onmessage callback for listening to worker events.
     * @function onmessage
     * @param {Object} - e
     */
    worker.onmessage = e => {
      /**
       * matTableDataSource has some default parametrs as object, one of them are (data)
       */
      this.movies.data = e.data;
      console.log('Worker said', e.data);
      console.log('Finished');
    };
    /**
     *  Post data to worker.
     */
    worker.postMessage({ path: '/1.0.0-alpha/movies/list' });
  }
}
export interface moviesElement {
  title: string;
  description: string;
  time: number;
}
