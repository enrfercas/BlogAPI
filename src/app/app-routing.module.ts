import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListaComponent} from "./componentes/lista/lista.component";
import {PostComponent} from "./componentes/post/post.component";
import {AddPostComponent} from "./componentes/add-post/add-post.component";

const routes: Routes = [
  {path:"",component:ListaComponent},
  {path:"lista",component:ListaComponent},
  {path:"post/:id",component:PostComponent},
  {path:"add/:id",component:AddPostComponent},
  {path:"add",component:AddPostComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
