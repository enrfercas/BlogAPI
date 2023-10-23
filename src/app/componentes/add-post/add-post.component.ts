import { Component,OnInit } from '@angular/core';
import {RecuperaService} from "../../servicios/recupera.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
public formGroup:FormGroup;
private postSaved: any = []
  constructor(public recupera: RecuperaService,public formBuilder:FormBuilder,public toastr:ToastrService,public router:Router,private route: ActivatedRoute) {
    this.formGroup=this.formBuilder.group({
      id:[""],
      title:["",[Validators.required, Validators.minLength(4)]],
      content_text:["",[Validators.required,Validators.minLength(15)]],
      photo_url:["/assets/photos/Escudo.jpg",[Validators.required]],
      category:["love"],
    });
    const id = this.route.snapshot.paramMap.get('id');
    console.log("EL id:",id);
    //const id:string|null=this.route.snapshot.queryParamMap.get("id");
    if(id){
      this.recupera.getSinglePost(Number(id))
        .subscribe((post:any) =>{
        const editPost: any = post.blog;
        if(editPost) {
          this.formGroup.patchValue({
            id:editPost.id,
            title:editPost.title,
            content_text:editPost.content_text,
            photo_url:editPost.photo_url,
            category:editPost.category,
          });
        } else {
          let posts= localStorage.getItem("post");
          console.log("posts:",posts)
          // @ts-ignore
          posts = JSON.parse(posts).find((post:any)=>{
            return post.id == id;
          });
          console.log(posts);
          this.formGroup.patchValue({
            // @ts-ignore
            id:posts.id,
            // @ts-ignore
            title:posts.title,
            // @ts-ignore
            content_text:posts.content_text,
            // @ts-ignore
            photo_url:posts.photo_url,
            // @ts-ignore
            category:posts.category,
          });

        }

      });
    }




  }
ngOnInit(){

}
  async onSubmit() {
    let nuevoPost = this.formGroup.value;
    nuevoPost.id = 1001;
    this.postSaved = localStorage.getItem("post");
    console.log("Post Saved:", this.postSaved);
    if (!this.postSaved) {
      localStorage.setItem("post", JSON.stringify([nuevoPost]));

    } else {
      if(this.route.snapshot.paramMap.get('id') && Number(this.route.snapshot.paramMap.get('id')) > 500){
        this.postSaved = JSON.parse(this.postSaved);
        console.log("2ºPost Saved:", this.postSaved);
        this.postSaved= this.postSaved.filter((post:any)=>{
          return post.id != Number(this.route.snapshot.paramMap.get('id'));
        });
        this.postSaved.push(nuevoPost);

      }else {
        this.postSaved = JSON.parse(this.postSaved);
        console.log("3ºPost Saved:", this.postSaved)
        nuevoPost.id = 1001 + this.postSaved.length;
        this.postSaved.push(nuevoPost);
      }
      localStorage.setItem("post", JSON.stringify(this.postSaved));
    }
    //this.toastr.success("Il post si è salvato");
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'success',
      title: 'Success'
    })
    this.router.navigate(['lista']);
  }
}
