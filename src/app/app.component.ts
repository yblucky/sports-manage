import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-web',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private router:Router) {
        //this.router.navigate(['common/login']);
        //this.router.navigate(['common/main']);

    }

}
