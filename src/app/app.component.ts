import { Component } from '@angular/core';
import { FormBuilder,FormControl,FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'devmodules';
  uploadedImages = [];
  showDelButton = false;
  route = '';

  userForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required, Validators.minLength(5)]],
    lastName: ['',Validators.required],
      street: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      zip: ['',Validators.required],
    image_uploads: this.formBuilder.array([this.formBuilder.group({image_point:''})])
  });
 
  constructor(private formBuilder: FormBuilder,
    private _service: CommonService) { }

  get imagesList() {
    return this.userForm.get('image_uploads') as FormArray;
}
public changeListener(files: FileList,number){
  this.uploadedImages[number] = files;
}

addImage() {
    this.showDelButton = true;
    this.imagesList.push(this.formBuilder.group({image_point:''}));
}

deleteImage(index) {
    this.imagesList.removeAt(index);
    // this.uploadedImages.removeAt(index);

    this.uploadedImages.splice(index,1);
    if(this.imagesList.length == 1){
      this.showDelButton = false;
    }
    //console.log(this.uploadedImages);
}

add_user(){
  const token = 'test';
  this.route = 'test-request';
  
  const formData = new FormData();

  for (const key of Object.keys(this.userForm['value'])) {
    formData.append(key,this.userForm['value'][key]);
  }


  for(var i = 0; i< this.uploadedImages.length; i++){
    formData.append('upload'+(i+1),this.uploadedImages[i].item(0),this.uploadedImages[i].item(0).name);
  }
  // console.log(this.userForm.value);
  console.log(formData);
  this._service.postRequestCreator(formData, this.route, token).subscribe((response:any) => {

    

  });
}

}
