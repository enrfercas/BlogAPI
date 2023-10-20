import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RecuperaService} from "../../servicios/recupera.service";
import { Location } from '@angular/common';
import {Respuesta} from "../../modelos/respuesta";
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public postId:number=0;
  public post:any=null;
  public singlePost:any=null;

  constructor(private route: ActivatedRoute,public recupera:RecuperaService,public location:Location) {

  }
  ngOnInit(): void {
    this.getSinglePost();
  }
  getSinglePost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.recupera.getSinglePost(Number(id)).
    subscribe((post:any) =>{
      console.log(post);
      this.post=post.blog;
    });
  }
  public goBack(){
    this.location.back();
  }
}
