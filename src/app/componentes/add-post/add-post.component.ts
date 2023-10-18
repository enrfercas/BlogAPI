import { Component,OnInit } from '@angular/core';
import {RecuperaService} from "../../servicios/recupera.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
public formGroup:FormGroup;
private postSaved: any = []
  constructor(public recupera: RecuperaService,public formBuilder:FormBuilder,public toastr:ToastrService,public router:Router) {
    this.formGroup=this.formBuilder.group({
      id:[""],
      title:["",[Validators.required, Validators.minLength(4)]],
      content_text:["",[Validators.required,Validators.minLength(15)]],
      photo_url:["",[Validators.required]],
      category:["love"],
    });



  }
ngOnInit(){

}
  onSubmit() {
    const nuevoPost= this.formGroup.value;
    this.postSaved = localStorage.getItem("post");
    if(!this.postSaved) {
      localStorage.setItem("post",JSON.stringify([nuevoPost]));
    } else {
      console.log("ciao")
      this.postSaved = JSON.parse(this.postSaved);
      this.postSaved.push(nuevoPost);
      localStorage.setItem("post",JSON.stringify(this.postSaved));

    }
    this.toastr.success("Il post si è salvato");
    this.router.navigate(['lista']);
  }
}
