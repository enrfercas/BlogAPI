import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecuperaService} from "../../servicios/recupera.service";
import {Respuesta} from "../../modelos/respuesta";
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  private risposta: Respuesta[] = [];
  public nuevaRespuesta:any = null;
  public searchKey:string="";
  public categorie:any=[];
  public categoria:string="";
  public numeroDePagina: number = 1;
  private cursor: number = 0;
  

  constructor(http: HttpClient,public recupera: RecuperaService) {

    this.recupera.getPeticion().subscribe((respuesta: any) => {
      
      this.risposta = respuesta.blogs;
      this.nuevaRespuesta = this.risposta.slice(this.cursor,this.cursor+10);
      this.getCategorie();
      this.categorie.push("");
      });
    console.log("las categorías:",this.categorie);
  }
//Usamos el método map() que recorre un array y realiza una función con cada elemento
  private getCategorie() {
    this.nuevaRespuesta.map((categoria:Respuesta)=>{
      if(!this.categorie.includes(categoria.category)){
        this.categorie.push(categoria.category);
      }
    });
  }

  // ¡¡¡Por hacer:Tenemos que evitar llamar al servicio y que este haga una petición cada vez que se pulse el botón!!!
  public nextPost(){
    this.cursor +=10;
    this.nuevaRespuesta = this.risposta.slice(this.cursor,this.cursor+10);
  }
  // ¡¡¡Por hacer:Tenemos que evitar llamar al servicio y que este haga una petición cada vez que se pulse el botón!!!
  public previewPost(){
    this.cursor -=10;
    this.nuevaRespuesta = this.risposta.slice(this.cursor,this.cursor-10);
   
  }

  //Usaremos el método filtra() tanto para filtrar por título mediante el input(searchKey) como para filtrar por categoría de manera simultánea.
  //Para ello usaremos la misma variable nuevaRespuesta y la actualizamos con cada uno de los filter()
  public filtra(){
    this.nuevaRespuesta = this.risposta;

    console.log('start search')

    if(this.searchKey.length > 0) {
      const searchKey: string = this.searchKey.toLowerCase();   //Sacamos el paso a toLowerCase del filter() para evitar iterar la función innecesariamente
      this.nuevaRespuesta = this.nuevaRespuesta.filter((post: any) =>{
        return post.title.toLowerCase().includes(searchKey)
      });
    }

    if(this.categoria.length > 0) {
      this.nuevaRespuesta = this.nuevaRespuesta.filter((post: any) =>{
        return post.category == this.categoria
      });
    }


  }

}
