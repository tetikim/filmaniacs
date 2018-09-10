import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { MoviesComponent } from './movies/movies.component';
import { New2018Component } from './new2018/new2018.component';
import { ActorsComponent } from './actors/actors.component';
import { CategoryComponent } from './category/category.component';

//component-routing
const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'new2018', component:  New2018Component },
  { path: 'actors', component: ActorsComponent },
  { path: 'category', component: CategoryComponent },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
