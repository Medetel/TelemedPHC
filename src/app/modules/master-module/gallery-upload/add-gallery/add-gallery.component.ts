import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../country/country.service';
import { GalleryUploadService } from '../gallery-upload.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { data } from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.scss']
})
export class AddGalleryComponent implements OnInit {
 videoUrl: string;
  [x: string]: any;
  country: any;
  fileIndexes: number[] = [];
  selectedFiles: File[] = [];
  selectedImages: string[] = [];
  selectedMedia: string[] = [];
  selectedFiless: File[] = [];
  // mediaName: string[] = [];
  columns: string[] = ['Column 1', 'Column 2', 'Column 3'];
  form: FormGroup;
  imageUrls: string[] = [];
selectedFil: File[] = [];
mediaUrls: string[] = [];
videoUrls: string[] = [];
selectedFile: File | null = null;

public documentGrp: FormGroup;
  public totalfiles: Array<File> =[];
  public totalFileName = [];
  public lengthCheckToaddMore =0;


  constructor(private renderer: Renderer2, private formBuilder: FormBuilder,private http: HttpClient, private fb: FormBuilder, private router: Router, private countryservice: CountryService, private service: GalleryUploadService, private notif: Notification) {
    
    this.form = this.formBuilder.group({
      rows: this.formBuilder.array([]),
      imageUrls: this.formBuilder.array([]),
      videoUrls: this.formBuilder.array([])
    });
  }
  codeValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;

    if (control.value && nameRegexp.test(control.value)) {
      return { alphaNumCheck: true };
    }
  }
  alphaValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaCheck: true };
    }
  }
  spaceValidator(control: any): { [key: string]: boolean } {
    if ((control.value as string).indexOf('  ') >= 0 || control.value.startsWith(' ') || control.value.endsWith(' ')) {
      return { spaceCheck: true };
    }
  }
  reset() {
    this.state.reset();
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.state.controls[controlName].hasError(errorName);
  }
  selectedId: any;
  ngOnInit(): void {
    this.get_gallery_dd_display();
    console.log("selectedId", this.selectedId)

  }
  image_media: boolean = true;
  pdf_media: boolean = true;
  video_media: boolean = true;
  none_media: boolean = false;

  myArray = [];
  empty_videoUrls: string[] = []; 
  select_dd_value(d: any) {
    this.selectedId = d.target.value
    console.log("selectedId", d.target.value)

    if (this.selectedId == '') {
      this.none_media = false;
      this.image_media = true
      this.pdf_media = true
      this.video_media = true
    } else if (this.selectedId == 1) {
      this.image_media = false
      this.pdf_media = true
      this.video_media = true
      this.none_media = true
      this.form.reset()
      this.form.setControl('rows', new FormArray([])); 
      this.videoUrls=[]
      this.imageUrls=this.myArray
    } else if (this.selectedId == 2) {
      this.image_media = true
      this.pdf_media = true
      this.video_media = false
      this.none_media = true
      this.form.reset()
      this.form.setControl('rows', new FormArray([])); 
      this.videoUrls=[]
      this.imageUrls=this.myArray
    } else if (this.selectedId == 3) {
      this.image_media = true
      this.pdf_media = true
      this.video_media = false
      this.none_media = true
      this.form.reset()
      this.videoUrls=[]
      //this.removeRow(this.rows.length) //saheb 
      this.form.setControl('rows', new FormArray([])); 
      this.imageUrls=this.myArray
    } else if (this.selectedId == 4) {
      this.image_media = true
      this.pdf_media = true
      this.video_media = false
      this.none_media = true
      this.form.reset()
      this.videoUrls=[]
      this.imageUrls=this.myArray
    } else if (this.selectedId == 5) {
      this.image_media = true
      this.pdf_media = false
      this.video_media = true
      this.none_media = true
      this.form.reset()
      this.form.setControl('rows', new FormArray([])); 
      this.videoUrls=[]
      this.imageUrls=this.myArray
    } else if (this.selectedId == 6) {
      this.image_media = true
      this.pdf_media = false
      this.video_media = true
      this.none_media = true
      this.form.reset()
      this.imageUrls=this.myArray
      this.form.setControl('rows', new FormArray([])); 
      this.videoUrls=[]
    } else {
      this.none_media = false
      this.notif.errorsmsg("Please select valid media type")
    }


  }

  get rows() {
    this.form.get('imagrurl') as FormArray;
    this.form.get('videoUrl') as FormArray;
   return this.form.get('rows') as FormArray;
  
  }

  addRow() {
    this.rows.push(this.createRow());
    this.imageUrls.push();
    this.videos.push();
  }
  createRow() {
    return this.formBuilder.group({
      'mediaName': [''],
      'Name': [this.selectedFile],
      'med_id_fk': [''],
      'imageURL': [''] ,
     

    });
  }

  removeRow(index) {
    this.rows.removeAt(index);
    this.imageUrls.splice(index,1);
    this.videoUrls.splice(index,1);
  }

  submitForm() {
    if (this.form.valid) {
      const formData = this.form.value;
      const formDataWithFiles = this.addFilesToFormData(formData);
      this.service.add_video(formDataWithFiles).subscribe(
        (response) => {
          this.notif.successmsg("Uploaded successfully")
          this.router.navigate(['/base/master/videogallery']);
        },
        (error) => {
          console.error('Upload failed', error);
        }
      );
    }
  }

  save() {
    if (this.state.invalid) {
      this.notif.errorsmsg("error")

    }
    this.service.dispaly(this.state.value)
      .subscribe((res) => {
        this.notif.successmsg(" added successfully")

      })

  }
  get_country() {
    this.service.Get_country()
      .subscribe((data) => {
        this.country = data
      })
  }
  get_gallery_dd_display() {
    this.service.get_gallery_dd()
      .subscribe((data) => {
        this.country = data
        console.log("media_name", data)
      })
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.uploadFile(event);
      //this.uploadImage(imageFile);
    }
  }
  onFileSelecte(event: any, index: number) {
    const file = event.target.files[0];

    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrls.push(reader.result as string);
          const newImageUrl = reader.result as string;
          const indexToUpdate = index * event.target.files.length + i; // Calculate the correct index
          if (this.imageUrls[indexToUpdate]) {
            this.imageUrls[indexToUpdate] = newImageUrl;
          } else {
            this.imageUrls.push(newImageUrl);
          }
  
          // Assuming 'this.rows' is a FormArray
          if (this.rows.controls[indexToUpdate]) {
            this.rows.controls[indexToUpdate].get('imageURL').setValue(newImageUrl);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  
    this.selectedFiles[index] = file;
    // You may display the file name or other information as per your requirement
    const fileName = file ? file.name : '';
    this.rows.at(index).get('Name').setValue(fileName);

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Update form control with image URL
        this.rows.controls['controls'].at(index).get('imageURL').setValue(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  
  
  }
  onselectvideo(event: any, index: number) {
    const file = event.target.files[0];
    this.selectedFiles[index] = file;
    // You may display the file name or other information as per your requirement
    const fileName = file ? file.name : '';
    this.rows.at(index).get('Name').setValue(fileName);
  }
  onselectpdf(event: any, index: number) {
    const file = event.target.files[0];
  
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.pdfUrls.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
    this.selectedFiles[index] = file;
    // You may display the file name or other information as per your requirement
    const fileName = file ? file.name : '';
    this.rows.at(index).get('Name').setValue(fileName);
  }
  addFilesToFormData(formData: any): FormData {
    const formDataWithFiles = new FormData();
    formData.rows.forEach((row: any, index: number) => {
      formDataWithFiles.append(`mediaName`, row.mediaName);
      formDataWithFiles.append(`Name`, this.selectedFiles[index]);
      formDataWithFiles.append('med_id_fk', this.selectedId)
    });
    return formDataWithFiles;
  }
  onSelectFile(fileInput: any, mediaNames: string[]) {
    const files = fileInput.target.files;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.selectedImages.push(e.target.result);
            };
            if (files[i].type.startsWith('image') || files[i].type.startsWith('video')) {
                reader.readAsDataURL(files[i]);
            }
            this.selectedFiles.push(files[i]);
           
        }
       
        this.selectedId = 1; // Setting med_id_fk to 1
    }
}

onSelectFiles(fileInput: any, event: any, index: number) {
  const files = event.target.files;

  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        const newFileUrl = reader.result as string;
        const indexToUpdate = index * files.length + i; // Calculate the correct index
        
        if (file.type.startsWith('image/')) {
          if (this.imageUrlsss[indexToUpdate]) {
            this.imageUrssls[indexToUpdate] = newFileUrl;
          } else {
            this.imageUrssls.push(newFileUrl);
          }
        } else if (file.type.startsWith('video/')) {
          if (this.videoUrls[indexToUpdate]) {
            this.videoUrls[indexToUpdate] = newFileUrl;
          } else {
            this.videoUrls.push(newFileUrl);
          }
        }

        // Assuming 'this.rows' is a FormArray and updating imageURL and videoURL accordingly
        if (this.rows.controls[indexToUpdate]) {
          this.rows.controls[indexToUpdate].get('imageUssRL').setValue(newFileUrl);
          this.rows.controls[indexToUpdate].get('videoURL').setValue(newFileUrl);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  // Store selected files
 this.selectedFiles[index] = files[0];;

  // Set file names in form control
  const fileNames = [];
  for (let i = 0; i < files.length; i++) {
    fileNames.push(files[i] ? files[i].name : '');
  }
  this.rows.at(index).get('Name').setValue(fileNames);

  // Assuming you want to store video URLs in the form control
  if (files && files.length) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Update form control with video URLs
        this.rows.controls['controls'].at(index).get('videoUrl').setValue(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  }
}
  removeMedia(index: number) {
    this.selectedMedia.splice(index, 1);
  }
  removepdf(index: number)
  {
    this.selectedFiles.splice(index, 1);
    this. selectedMedias.splice(index, 1);
  }

  SelectFile(fileInput: any) {
    this.selectedFile = fileInput.target.files[0];
    const files = fileInput.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiless.push(e.target.result);
          //this.selec tedImages.push(e.target.result);
        };
       
        this.selectedFiles.push(files[i]);
      }
    }
  }
  
  removeImage(index: number) {
    this.imageUrls.splice(index, 1);
  }
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('name', file, file.name);
   
    console.log(this.selectedFile)
    formData.append('Name', this.state.value.Name);
    formData.append('FilePath', this.selectedFile);
    console.log("hari form", this.state.value)
    this.service.add_video(formData)
      .subscribe(
        (data) => {
          console.log('Upload success!', formData);
        },
        (error) => {
          console.error('Upload error:', error);
        }
      );
  }
  onFileSelect(event, index: number): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFiles[index] = files.item(0);
    }
  }
  formDataArray: any[] = [];

  addFileField(): void {
    
    this.fileIndexes.push(this.fileIndexes.length);
    console.log("Array_new", this.fileIndexes)
    
    
  }

 isVideo(url: string): boolean {
    return url.startsWith('data:video');
  }
  
 
}
