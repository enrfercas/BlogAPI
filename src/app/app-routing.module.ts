import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListaComponent} from "./componentes/lista/lista.component";
import {PostComponent} from "./componentes/post/post.component";

const routes: Routes = [
  {path:"",component:ListaComponent},
  {path:"lista",component:ListaComponent},
  {path:"post/:id",component:PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
