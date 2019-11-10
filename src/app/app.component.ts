import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppService} from './AppService';
import {LoginComponent} from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'fronted';

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  logout() {
    this.http.post('paymentSystem/logout', {}).subscribe(resp => {
      this.router.navigateByUrl('');
      this.app.authenticated = false;
    });
  }

  authenticated() {
    return this.app.authenticated;
  }

  checkAdmin() {
    if (JSON.parse(localStorage.getItem('user')).roleId === 2) {
      return true;
    } else {
      return false;
    }
  }
}
