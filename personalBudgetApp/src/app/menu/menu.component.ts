import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // username = '';
  constructor(private configuredService: ConfigService,
    private myRouter: Router) {
    // this.configuredService.getUserName()
    // .subscribe(
    //   data => this.username = data.toString(),
    //   error => this.myRouter.navigate(['/login'])
    // )
  }
  ngOnInit(){
  }
  logout(){
    localStorage.removeItem('token');
    this.myRouter.navigate(['/login']);
  }
}
