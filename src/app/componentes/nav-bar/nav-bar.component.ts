import { Component } from '@angular/core';
import {RecuperaService} from "../../servicios/recupera.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(public recupera:RecuperaService) {
  }
  public clear(){
    localStorage.clear();
    this.recupera.ifNuevoPost=false;
  }
}
