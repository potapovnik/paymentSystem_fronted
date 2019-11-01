import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppService} from './AppService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'fronted';

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    this.app.authenticate(undefined, undefined);
  }

  logout() {
    this.http.post('paymentSystem/logout', {}).subscribe(resp => {
      this.app.authenticated = false;
    });
  }

  authenticated() {
    return this.app.authenticated;
  }
}
