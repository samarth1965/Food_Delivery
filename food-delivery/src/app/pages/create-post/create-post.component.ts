// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { PostServiceService } from '../../services/post-service.service';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// import { DomSanitizer } from '@angular/platform-browser';
// import { FileHandle } from '../../model/file-handle.model';
// import { Posts } from '../../posts';

// @Component({
//   selector: 'app-create-post',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './create-post.component.html',
//   styleUrl: './create-post.component.css'
// })
// export class CreatePostComponent {
//   postForm: FormGroup;

//   constructor(private fb: FormBuilder, private postService: PostServiceService,private sanitizer:DomSanitizer) {
//     this.postForm = this.fb.group({
//       title: ['', Validators.required],
//       description: [''],
//       content: ['', Validators.required],
//       imageModelSet: [[]] 
//       // Add image control to the form
//     });
//   }

//   onSubmit() {
//     console.log('Submitting form...');
//     debugger;
    
//     if (this.postForm.valid) {
//       const postFormData  = this.prepareFormData(this.postForm.value);
//       // const postData = this.postForm.value;
//       this.postService.createPost(postFormData).subscribe(
//         response => {
//           console.log('Post created successfully:', response);
//           this.postForm.reset();
//           // Optionally, you can navigate to the dashboard or show a success message here
//         },
//         error => {
//           console.error('Error creating post:', error);
//           // Handle error response
//         }
//       );
//     } else {
//       // If the form is not valid, mark all fields as touched to display validation errors
//       this.markFormGroupTouched(this.postForm);
//     }
//   }

//   prepareFormData(post:Posts):FormData{
//     const formData = new FormData();
//     formData.append(
//       'post',
//       new Blob([JSON.stringify(post)],{type:'application/json'})
//     );

//     for(var i=0;i<post.imageModelSet.length;i++){
//       formData.append(
//         'imageFile',
//         post.imageModelSet[i].file,
//         post.imageModelSet[i].file.name
//       );
//     }
//     return formData
//   }
//   onFileSelected(event:any) {
//     console.log(event)
//     if(event.target.file){}{
//     const file = event.target.files[0];
//     // You can perform additional operations such as file validation or preview here
//     const fileHandle:FileHandle = {
//       file:file,
//       url: this.sanitizer.bypassSecurityTrustResourceUrl(
//         window.URL.createObjectURL(file)
//       )
//     }
//     const imageModelSet = this.postForm.get('imageModelSet');
//     if(imageModelSet){
//       const currentValue = imageModelSet.value || []; 
//        imageModelSet.setValue([...currentValue, fileHandle]);
//       }
//   }
//   }

//   private markFormGroupTouched(formGroup: FormGroup) {
//     Object.values(formGroup.controls).forEach(control => {
//       control.markAsTouched();

//       if (control instanceof FormGroup) {
//         this.markFormGroupTouched(control);
//       }
//     });
//   }
// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FoodServiceService } from '../../services/food-service.service';
import { Food } from '../../model/food';
import { FileHandle } from '../../model/file-handle.model';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class CreatePostComponent {
  postForm: FormGroup;
  imagePreviews: string[] = [];

  constructor(
    private fb: FormBuilder, 
    private postService: FoodServiceService,
    private sanitizer: DomSanitizer,

  ) {
    this.postForm = this.fb.group({
      foodName: ['', Validators.required],
      foodCategory: [''],
      imageModelSet: [[]] 
    });
  }

  onSubmit() {
    console.log('Submitting form...');
    if (this.postForm.valid) {
      const formData = this.prepareFormData(this.postForm.value);
      this.postService.createPost(formData).subscribe(
        response => {
          console.log('Post created successfully:', response);
          this.postForm.reset();
          // Optionally, you can navigate to the dashboard or show a success message here
        },
        error => {
          console.error('Error creating post:', error);
          // Handle error response
        }
      );
    } else {
      // If the form is not valid, mark all fields as touched to display validation errors
      this.markFormGroupTouched(this.postForm);
    }
  }

  prepareFormData(post: Food): FormData {
    const formData = new FormData();
    //assign the username to the posts
    debugger
    // post.username = localStorage.getItem('username') || '';
    formData.append(
      'food',
      new Blob([JSON.stringify(post)],{type:'application/json'})
    );
    for (var i=0;i<post.imageModelSet.length;i++) {
      formData.append(
        'imageFile', 
        post.imageModelSet[i].file,
        post.imageModelSet[i].file.name  
      );
    }
    // formData.append('post', JSON.stringify(post));
    return formData;
  }

  onFileSelected(event: any) {
    
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file))
      };
      const imageModelSet = this.postForm.get('imageModelSet');
      if (imageModelSet) {
        const currentValue: FileHandle[] = imageModelSet.value || []; 
        imageModelSet.setValue([...currentValue, fileHandle]);
      }
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
