import { Component, AfterViewInit } from '@angular/core';
declare var M: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss'],
  standalone: false
})
export class Nav implements AfterViewInit {
  ngAfterViewInit(): void {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

  }
 

  
}