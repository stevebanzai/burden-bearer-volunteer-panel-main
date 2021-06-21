import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { TokenStorageService } from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;
  userRecord: any;
  adminname1: any
  timeNow: Date = new Date();
  showHeader = true;
  loginStatus: any;
  isLoggedIn: any;
  ngOnInit(): void {
    this.loginStatus = localStorage.getItem("login_status");
    this.adminname1 = localStorage.getItem("adminname");
  }

  constructor(private router: Router, private authService: AuthService, private tokenService: TokenStorageService) {
    setInterval(() => {
      this.timeNow = new Date();
    }, 1);
    this.authService.headerDisplay.subscribe(message => {
      this.showHeader = message;
    });
    this.user = this.tokenService.getUser();
    this.userRecord = JSON.parse(this.user)
  }
  getheader() {
    let volunteerId = localStorage.getItem('father_id');
    if (volunteerId != null || volunteerId != undefined) {
      this.showHeader = true;
    }

  }

  logout() {



    this.tokenService.signOut();
    localStorage.clear();
    this.authService.headerFlag(false);
    this.router.navigateByUrl('/');
  }

  @Input() Opencalendar: any
  openCaledar() {
    this.Opencalendar = true
    this.router.navigateByUrl('dashboard');
  }
}
