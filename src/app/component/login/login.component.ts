import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userlist: any;
  roles: string[] = [];
  tokenStorage: any;
  ngOnInit(): void {
    this.authService.headerFlag(false);
  }

  constructor(private authService: AuthService, private router: Router, private tsServicetorageService: TokenStorageService) {
    this.autologin()
  }


  autologin() {
    let loginStatus = localStorage.getItem("login_status");
    if (loginStatus == 'true') {
      this.router.navigateByUrl('dashboard')
    }
    else {
      this.router.navigateByUrl('')
    };
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        // this.tokenStorage.setLoginStatus(true);
        this.authService.headerFlag(true);
        localStorage.setItem("login_status", "true");
        this.userlist = data;
        console.log(this.userlist)
        localStorage.setItem("role", this.userlist.roles);
        localStorage.setItem("father_id", data.username);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        localStorage.setItem("adminname", data.first_name)
        this.tsServicetorageService.saveUser(data);
        console.log(this.userlist)
        this.router.navigateByUrl('dashboard');
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
