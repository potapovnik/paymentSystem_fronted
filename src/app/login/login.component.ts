import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../AppService';
import {User} from '../users/users';
import {Balance} from '../balance/balance';
import {UserService} from '../users/user.service';
import {BalanceService} from '../balance/balance.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {username: '', password: ''};
  currentUser: User;
  currentBalance: Balance;

  constructor(private app: AppService, private http: HttpClient, private router: Router,
              private userService: UserService, private balanceService: BalanceService) {
  }

  ngOnInit() {
  }

  login() {
    this.app.authenticate(this.credentials, () => {
      this.userService.getUserByLogin(this.credentials.username).subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.balanceService.getBalanceOfCurrentUser(user.id).subscribe(balance => {
          localStorage.setItem('balance', JSON.stringify(balance));
        });
      });

      this.router.navigateByUrl('/balance');
    });
    return false;
  }


}
