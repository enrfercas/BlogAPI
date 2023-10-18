import { Component } from '@angular/core';
import {RecuperaService} from "./servicios/recupera.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog_API';


  constructor(public recupera: RecuperaService){}

}
