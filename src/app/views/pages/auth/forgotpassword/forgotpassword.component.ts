import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../../environments/environment.prod';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../UserDetails/user.service';
import { UserProfile } from '../UserDetails/user.profile';
import { IProfile } from '../UserDetails/user.model';
import { Notification } from '../../../../core/Notifications/Notification';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgotpassword.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class forgotpasswordComponent implements OnInit {
  forgotdetails: forgot;
  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
    private authProfile: UserProfile,
    private router: Router, private route: ActivatedRoute,
    private userservice: UserService, private Http: HttpClient, private notify: Notification) {
    this.forgotdetails = <forgot>{};
  }

  ngOnInit(): void {

  }
  onSubmit(){

  }

}
export interface forgot {
  userid: string;
  changepassword: string;
  confirmpassword: string;
}