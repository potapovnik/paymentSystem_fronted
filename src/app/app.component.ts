import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppService} from './AppService';
import {LoginComponent} from './login/login.component';
import {User} from './users/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {


  currentUser: User;

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    this.app.currentUser.subscribe(x => this.currentUser = x);
  }


  logout() {
    this.app.logout();
    this.router.navigate(['/login']);
  }
  roleAccess() {
    if (this.currentUser.roleId === 1) {
      return true;
    }
  }

}
