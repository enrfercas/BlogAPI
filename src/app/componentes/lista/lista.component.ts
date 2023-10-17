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
  public nuevaRespuesta: any = null;
  public searchKey: string = "";
  public categorie: any = [];
  public categoria: string = "";
  public numeroDePagina: number = 1;
  private cursor: number = 0;


  constructor(public recupera: RecuperaService) {
//Llamamos al servicio para recibir todos los post y los guardamos en un array. Cortamos los 10 primeros elementos para presentar la primera página.
//En caso de que exista un nuevo post, lo recibimos mediante el servicio y lo añadimos al array de post.
    this.recupera.getPeticion().subscribe((respuesta: any) => {
      this.risposta = respuesta.blogs;
      if(this.recupera.ifNuevoPost){
        for(let i=0;i<this.recupera.numNuevoPost;i++){
          this.risposta.unshift(this.recupera.getNuevoPost());
          this.risposta[i].id=this.risposta.length+1;
        }
      }
      this.nuevaRespuesta = this.risposta.slice(this.cursor, this.cursor + 10);
//Llenamos el array de categorías y añadimos una en blanco
//Añadimos una nueva clave en nuestro array de objetos llamada summary para presentar una cantidad reducida del texto.

      this.getCategorie();
      this.categorie.push("");
      this.nuevaRespuesta = this.nuevaRespuesta.map((post: any) => {
        post.summary = post.content_text.substring(0, 150);
        return post;
      });
    });
    console.log("las categorías:", this.categorie);


  }

//Creamos un array con las categorías que existen en el array para poder filtrar para ello
// usamos el método map() que recorre un array y realiza una función con cada elemento.
  private getCategorie() {
    this.nuevaRespuesta.map((categoria: Respuesta) => {
      if (!this.categorie.includes(categoria.category)) {
        this.categorie.push(categoria.category);
      }
    });
  }


  public nextPost() {
    this.cursor += 10;
    this.nuevaRespuesta = this.risposta.slice(this.cursor, this.cursor + 10);
    this.numeroDePagina += 1;
    this.nuevaRespuesta = this.nuevaRespuesta.map((post: any) => {
      post.summary = post.content_text.substring(0, 150);
      return post;
    });
  }


  public previewPost() {
    this.cursor -= 10;
    this.nuevaRespuesta = this.risposta.slice(this.cursor, this.cursor + 10);
    this.numeroDePagina -= 1;
    this.nuevaRespuesta = this.nuevaRespuesta.map((post: any) => {
      post.summary = post.content_text.substring(0, 150);
      return post;
    });
  }

  //Usaremos el método filtra() tanto para filtrar por título mediante el input(searchKey) como para filtrar por categoría de manera simultánea.
  //Para ello usaremos la misma variable nuevaRespuesta y la actualizamos con cada uno de los filter()
  public filtra() {
    let filtered = this.risposta;

    console.log('start search')

    if (this.searchKey.length > 0) {
      const searchKey: string = this.searchKey.toLowerCase();   //Sacamos la llamada a toLowerCase del filter() para evitar iterar la función innecesariamente
      filtered = filtered.filter((post: any) => {
        return post.title.toLowerCase().includes(searchKey)
      });
      this.nuevaRespuesta = this.nuevaRespuesta.map((post: any) => {
        post.summary = post.content_text.substring(0, 150);
        return post;
      });
    }

    if (this.categoria.length > 0) {
      filtered = filtered.filter((post: any) => {
        return post.category == this.categoria
      });
    }
    this.nuevaRespuesta = filtered
    this.nuevaRespuesta = this.nuevaRespuesta.map((post: any) => {
      post.summary = post.content_text.substring(0, 150);
      return post;
    });
  }
}
