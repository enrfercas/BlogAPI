import { Component } from '@angular/core';
import {RecuperaService} from "../../servicios/recupera.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(public recupera:RecuperaService,public router:Router) {
  }
  public clear(){
    localStorage.clear();
    this.router.navigate(['lista']);

  }
}
