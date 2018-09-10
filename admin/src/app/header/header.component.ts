import { Component, Inject, Injectable } from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable()
export class HeaderComponent {

  constructor( @Inject(DOCUMENT) private document: any ) { }

  logout () {
      this.document.logoutForm.submit();
      return false;
  }
}
