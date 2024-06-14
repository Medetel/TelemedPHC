import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import MetisMenu from 'metismenujs/dist/metismenujs';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/app/core/Notifications/Notification';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarToggler') sidebarToggler: ElementRef;
  panelOpenState = false;
  menuItems = [];
  data;
  image_url;
  access_data: any;
  roleName: any;
  @ViewChild('sidebarMenu') sidebarMenu: ElementRef;
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, router: Router, private http: HttpClient
    , private notif: Notification) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        /**
         * Activating the current active item dropdown
         */
        this._activateMenuDropdown();

        /**
         * closing the sidebar
         */
        if (window.matchMedia('(max-width: 991px)').matches) {
          this.document.body.classList.remove('sidebar-open');
        }
      }
    });
  }
  ngOnInit(): void {
    this.roleName = localStorage.getItem('roleName');
    this.image_url = "";
    //console.log('role name :' + this.roleName)
    if (this.roleName == 'Doctor') {
      //Data bind in api
      this.GetHospital_logo()
        .subscribe((result: any) => {
          console.log('doctor logo:', result)
          this.image_url = result.hos_HospitalLogo;

        })
    }
    else if (this.roleName == 'Medical Assistant') {
      //Data bind in api
      this.GetMedicalAssistant_logo()
        .subscribe((result: any) => {
          //console.log('doctor logo')
          this.image_url = result.hos_HospitalLogo;
        })
    }
    else if (this.roleName == 'Hospital Admin') {
      //Data bind in api
      this.GetHospitalAdmin_logo()
        .subscribe((result: any) => {
          //console.log('doctor logo')
          this.image_url = result.hos_HospitalLogo;
        })
    }
    else {
      //console.log('admin logo')
      this.image_url = "assets/images/medgrama_logo.jpeg";
    }
    this.menu_method().subscribe((data: MenuItem[] = []) => {
      this.data = data
    }, (error) => {
      this.notif.errorsmsg("Something went wrong")
    })

    // this.menuItems = MENU;

    /**
     * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
     */
    const desktopMedium = window.matchMedia('(min-width:992px) and (max-width: 1199px)');
    desktopMedium.addListener(this.iconSidebar);
    this.iconSidebar(desktopMedium);
  }
  menu_method() {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedMenus`)
  }
  GetHospital_logo() {
    return this.http.get(`${environment.API_Base_URL}` + `Doctor/GetHospitallogo_doctor`)
  }
  GetMedicalAssistant_logo() {
    return this.http.get(`${environment.API_Base_URL}` + `Doctor/GetHospitallogo_MediclAssistant`)
  }
  GetHospitalAdmin_logo() {
    return this.http.get(`${environment.API_Base_URL}` + `Doctor/GetHospitallogo_HospitalAdmin`)
  }
  ngAfterViewInit() {
    // activate menu item
    new MetisMenu(this.sidebarMenu.nativeElement);

    this._activateMenuDropdown();
  }

  /**
   * Toggle sidebar on hamburger button click
   */
  toggleSidebar(e) {
    this.sidebarToggler.nativeElement.classList.toggle('active');
    this.sidebarToggler.nativeElement.classList.toggle('not-active');
    if (window.matchMedia('(min-width: 992px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-folded');
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-open');
    }
  }


  /**
   * Toggle settings-sidebar 
   */
  toggleSettingsSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('settings-open');
  }

  /**
   * Open sidebar when hover (in folded folded state)
   */
  operSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.add("open-sidebar-folded");
    }
  }


  /**
   * Fold sidebar after mouse leave (in folded state)
   */
  closeSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.remove("open-sidebar-folded");
    }
  }

  /**
   * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
   */
  iconSidebar(e) {
    if (this.document != undefined) {
      if (e.matches) {
        this.document.body.classList.add('sidebar-folded');
      } else {
        this.document.body.classList.remove('sidebar-folded');
      }
    }

  }


  /**
   * Switching sidebar light/dark
   */
  onSidebarThemeChange(event) {
    this.document.body.classList.remove('sidebar-light', 'sidebar-dark');
    this.document.body.classList.add(event.target.value);
    this.document.body.classList.remove('settings-open');
  }


  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }


  /**
   * Reset the menus then hilight current active menu item
   */
  _activateMenuDropdown() {
    this.resetMenuItems();
    this.activateMenuItems();
  }

  resetMenuItems() {

    const links = document.getElementsByClassName('nav-link-ref');

    for (let i = 0; i < links.length; i++) {
      const menuItemEl = links[i];
      menuItemEl.classList.remove('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.remove('mm-active');
        const parent2El = parentEl.parentElement;

        if (parent2El) {
          parent2El.classList.remove('mm-show');
        }

        const parent3El = parent2El.parentElement;
        if (parent3El) {
          parent3El.classList.remove('mm-active');

          if (parent3El.classList.contains('side-nav-item')) {
            const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

            if (firstAnchor) {
              firstAnchor.classList.remove('mm-active');
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.remove('mm-show');

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.remove('mm-active');
            }
          }
        }
      }
    }
  };

  activateMenuItems() {

    const links = document.getElementsByClassName('nav-link-ref');

    let menuItemEl = null;

    for (let i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i]['pathname']) {
        menuItemEl = links[i];
        break;
      }
    }
    if (menuItemEl) {
      menuItemEl.classList.add('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.add('mm-active');

        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.add('mm-show');
        }

        const parent3El = parent2El.parentElement;
        if (parent3El) {
          parent3El.classList.add('mm-active');

          if (parent3El.classList.contains('side-nav-item')) {
            const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

            if (firstAnchor) {
              firstAnchor.classList.add('mm-active');
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.add('mm-show');

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.add('mm-active');
            }
          }
        }
      }
    }
  };

}