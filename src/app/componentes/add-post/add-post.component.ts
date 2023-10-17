import { Component,OnInit } from '@angular/core';
import {RecuperaService} from "../../servicios/recupera.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
public formGroup:FormGroup;
  constructor(public recupera: RecuperaService,public formBuilder:FormBuilder) {
    this.formGroup=this.formBuilder.group({
      id:[""],
      title:["",[Validators.required, Validators.minLength(4)]],
      content_text:["",[Validators.required,Validators.minLength(15)]],
      photoUrl:["",[Validators.required]],
      category:["love"],
    });
  }
ngOnInit(){

}
  onSubmit() {
    const nuevoPost= this.formGroup.value;
    localStorage.setItem(nuevoPost.title,JSON.stringify(nuevoPost));
    console.log(nuevoPost);
    this.recupera.setNuevoPost(nuevoPost);
    const guardado= localStorage.getItem(nuevoPost.title);
    console.log(guardado);
  }
}
