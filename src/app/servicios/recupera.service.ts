import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Respuesta} from "../modelos/respuesta";



@Injectable({
  providedIn: 'root'
})
export class RecuperaService {
  private blogUrl = "https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=500";
  private singleUrl:string="https://api.slingacademy.com/v1/sample-data/blog-posts/"
  public nuevoPost:any=null;
  public ifNuevoPost:boolean=false;
  public numNuevoPost:number=0;





  constructor(private http: HttpClient) {
  }

  public getPeticion(): Observable<Respuesta> {
    return this.http.get<Respuesta>(this.blogUrl);
  }
  public getSinglePost(id:number): Observable<Respuesta>{
    return this.http.get<Respuesta>(this.singleUrl.concat(id.toString()));
  }

}










