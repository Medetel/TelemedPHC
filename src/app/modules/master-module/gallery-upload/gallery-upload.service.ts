import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalleryUploadService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  Get_allState() {
    return this.http.get(`${environment.API_Base_URL}` + `State/GetAllState`)
  }
  Post_state(data) {
    return this.http.post(`${environment.API_Base_URL}` + `State/InsertState`, data)
  }
  Put_state(data) {
    return this.http.put(`${environment.API_Base_URL}` + `State/UpdateState`, data)
  }
  Delete_state(data) {
    return this.http.delete(`${environment.API_Base_URL}` + `State/DeleteState?stat_id=${data}`)
  }
  // deletegallery(data)
  // {
  //   return this.http.delete(`${environment.API_Base_URL}`+`MediaAwareness/DeleteMediaAwarnessDocumentById=${data}`) 
  // }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
  Get_country() {
    return this.http.get(`${environment.API_Base_URL}` + `Country/GetCountry_DD`)
  }


  dispaly(data) {
    return this.http.get(`${environment.API_Base_URL}` + `MediaAwareness/GetAllMediaDocument`, data)
  }
  Put_Approval(data) {
    return this.http.put(`${environment.API_Base_URL}` + `State/ApproveState`, data)
  }

  add_video(data) {
    return this.http.post(`${environment.API_Base_URL}` + `MediaAwareness/InsertVedioAwareness_Document`, data)
  }
  getVideos() {
    return this.http.get(`${environment.API_Base_URL}` + `MediaAwareness/GetAllMediaDocument`)
  }
  delete_gallery(data) {
    return this.http.delete(`${environment.API_Base_URL}` + `MediaAwareness/DeleteMediaAwarnessDocumentById?Do_Id=${data}`)
  }
  get_gallery_dd() {
    return this.http.get(`${environment.API_Base_URL}` + `MediaAwareness/GetMediaType_DD`)
  }


}
