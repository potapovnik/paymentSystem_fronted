import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './users/user.service';
import {BalanceService} from './balance/balance.service';
import {User} from './users/users';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AppService {

  roleId: number;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient, private userService: UserService, private balanceService: BalanceService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('/paymentSystem/user/current', {headers: headers}).subscribe(response => {
      if (response['name']) {
        this.userService.getUserByLogin(credentials.username).subscribe(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.roleId = user.roleId;
          this.balanceService.getBalanceOfCurrentUser(user.id).subscribe(balance => {
            localStorage.setItem('balance', JSON.stringify(balance));
            this.router.navigateByUrl('/balance');
          });
        });
      } else {
      }
      return callback && callback();
    });

  }


  logout() {
    this.http.post('paymentSystem/logout', {}).subscribe(resp => {
      localStorage.clear();
      this.currentUserSubject.next(null);
    });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

}
