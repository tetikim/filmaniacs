import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { CategoriesService } from './categories.service';

@Component({
  selector: 'categories',
  providers: [{provide: ValidatorService, useClass: CategoriesService }],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
 
  constructor(private personValidator: ValidatorService) { }

  displayedColumns = ['name', 'actionsColumn'];
  categories = new MatTableDataSource();

    @Input() CategoriesList = [ { name: ''}] ;
    @Output() CategoriesListChange = new EventEmitter<CategoriesElement[]>();
  
    dataSource: TableDataSource<CategoriesElement>;
    
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    applyFilter(filterValue: string){
      this.categories.filter = filterValue.trim().toLowerCase();
    }

  ngOnInit() {
    this.dataSource = new TableDataSource<any>(this.CategoriesList, CategoriesElement, this.personValidator);
    this.dataSource.datasourceSubject.subscribe(CategoriesList => this.CategoriesListChange.emit(this.CategoriesList));

    this.categories.sort = this.sort;
    this.categories.paginator = this.paginator;

    const worker: Worker = new Worker( 'admin/js/workers/worker.js' );
    worker.onmessage = e => {
      this.categories.data = e.data;
      console.log('Worker said', e.data);
      console.log('Finished');
    };

    worker.postMessage({ path: '/1.0.0-alpha/category/list' });
    // worker.postMessage({ path: '/1.0.0-alpha/category/update' });
  }
}

export class CategoriesElement {
  name: string;
}


