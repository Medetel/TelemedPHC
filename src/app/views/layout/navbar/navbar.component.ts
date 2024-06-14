import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../pages/auth/UserDetails/user.service';
import { GlobalStorage } from '../../../core/Gloabl/Global';
import { ProfileService } from 'src/app/modules/profile-module/profile.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string;
  userdata: any;
  useremail: string;
  image_Url;
  test: any = 'Welcome Test';
  message: any;
  private inactivityTimeout: any;
  private readonly INACTIVITY_TIMEOUT_DURATION = 55 * 60 * 1000; // 55 minutes in milliseconds
  private readonly CHECK_INTERVAL = 55 * 60 * 1000; // 55 minutes in milliseconds
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private user: UserService,
    private store: GlobalStorage,
    private notif: Notification,
    private service: ProfileService
  ) { }

  ngOnInit(): void {
    this.startInactivityTimeout();
    this.service.currentUserImage.subscribe(data => {
      console.log('Test image')
      console.log(data)
      if (data != undefined) {
        this.image_Url = data;
      }
    })
    this.get_profile();   
  }

  receivename($event: string) {
    this.test = $event;   
  }


  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }


  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeUnload(event: Event) {
  //   // Trigger logout when the tab is closed
  //   this.logout()
  //   clearTimeout(this.inactivityTimeout);
  // }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    // Check if the event is triggered due to window/tab close
    if (!(event instanceof BeforeUnloadEvent)) {
      // This is not a window/tab close event, do not logout
      return;
    }
    // Trigger logout when the tab is closed
    this.logout();
    clearTimeout(this.inactivityTimeout);
  }

  logout() {
    // Your logout logic here
    // Example:
    this.user.logoutonce(this.userdata.id)
      .subscribe((res) => {
        // Handle logout success
        this.notif.successmsg("User Logged out Successfully");
        this.user.logout();
        this.router.navigate(['/auth/login']);
      }, (error) => {
        // Handle logout error
        console.error('Error during logout', error);
        this.notif.errorsmsg("Logout failed");
      });
  }

  onLogout(e) {
    this.user.logoutonce(this.userdata.id)
      .subscribe((res) => {
      })
    this.notif.successmsg("User Logged out Successfully")
    e.preventDefault();
    this.user.logout();
    this.router.navigate(['/auth/login']);
  }

  get_profile() {
    this.service.Get_Userprofile()
      .subscribe((res) => {
        this.userdata = res;
        console.log('Profile Data', this.userdata);
        this.image_Url = this.userdata.imagename;
      })
  }

  private startInactivityTimeout(): void {
    this.inactivityTimeout = setTimeout(() => {
      // Logout the user after inactivity timeout
      this.logout();
    }, this.INACTIVITY_TIMEOUT_DURATION);

    // Check for user activity periodically
    setInterval(() => {
      // Reset the timeout on user activity
      clearTimeout(this.inactivityTimeout);
      this.inactivityTimeout = setTimeout(() => {
        // Logout the user after inactivity timeout
        this.logout();
      }, this.INACTIVITY_TIMEOUT_DURATION);
    }, this.CHECK_INTERVAL);
  }

}