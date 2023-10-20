import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecuperaService} from "../../servicios/recupera.service";
import {Respuesta} from "../../modelos/respuesta";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

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


  constructor(public recupera: RecuperaService,private router:Router) {
//Llamamos al servicio para recibir todos los post y los guardamos en un array. Cortamos los 10 primeros elementos para presentar la primera página.
//En caso de que exista un nuevo post, lo recibimos mediante el servicio y lo añadimos al array de post.
    this.recupera.getPeticion().subscribe((respuesta: any) => {
      this.risposta = respuesta.blogs;

        if(this.risposta) {
          let postSavedLocalStorage: any;
          // @ts-ignore
          postSavedLocalStorage = JSON.parse(localStorage.getItem("post"));
          console.log(postSavedLocalStorage);
          if(postSavedLocalStorage) {
            this.risposta.unshift(...postSavedLocalStorage)
          }

        }

      this.nuevaRespuesta = this.risposta.slice(this.cursor, this.cursor + 12);
//Llenamos el array de categorías y añadimos una en blanco
//Añadimos una nueva clave en nuestro array de objetos llamada summary para presentar una cantidad reducida del texto.

      this.getCategorie();
      this.categorie.push("");
      for(let post of this.nuevaRespuesta) {
        post.summary = post.content_text.substring(0, 200);
      }

    });
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
    this.cursor += 12;
    this.nuevaRespuesta = this.risposta.slice(this.cursor, this.cursor + 12);
    this.numeroDePagina += 1;
    this.nuevaRespuesta = this.nuevaRespuesta.map((post: any) => {
      post.summary = post.content_text.substring(0, 200);
      return post;
    });
  }


  public previewPost() {
    this.cursor -= 12;
    this.nuevaRespuesta = this.risposta.slice(this.cursor, this.cursor + 12);
    this.numeroDePagina -= 1;
    this.nuevaRespuesta = this.nuevaRespuesta.map((post: any) => {
      post.summary = post.content_text.substring(0, 200);
      return post;
    });
  }

  //Usaremos el método filtra() tanto para filtrar por título mediante el input(searchKey) como para filtrar por categoría de manera simultánea.
  //Para ello usaremos la misma variable nuevaRespuesta y la actualizamos con cada uno de los filter()
  public filtra() {
    let filtered = this.risposta;


    if (this.searchKey.length > 0) {
      const searchKey: string = this.searchKey.toLowerCase();   //Sacamos la llamada a toLowerCase del filter() para evitar iterar la función innecesariamente
      filtered = filtered.filter((post: any) => {
        return post.title.toLowerCase().includes(searchKey)
      });
      this.nuevaRespuesta = this.nuevaRespuesta.map((post: any) => {
        post.summary = post.content_text.substring(0, 200);
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
      post.summary = post.content_text.substring(0, 200);
      return post;
    });
  }
  public delete(id:number){
    //Alert de sweetAlert
    Swal.fire({
      title: 'Sei sicuro di voler cancellare questo post?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },icon:"info"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cancellato!', '', 'info')
        //this.nuevaRespuesta= this.nuevaRespuesta.filter((post:any)=> post.id != id );
        this.nuevaRespuesta = this.nuevaRespuesta.filter((post:any)=>{
          return post.id!=id;
        });
      } else if (result.isDenied) {
        Swal.fire('Non Cancellato', '', 'info')
      }
    })


  }

}
