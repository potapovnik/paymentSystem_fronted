import {Component, OnInit} from '@angular/core';
import {Balance} from './balance';
import {BalanceService} from './balance.service';
import {Router} from '@angular/router';
import {User} from '../users/users';
import {AppService} from '../AppService';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  balanceOfUser: Balance;
  currentUser: User;
  errBalance: String;

  constructor(private balanceService: BalanceService, private router: Router, private app: AppService) {

  }

  ngOnInit() {
    this.init();
  }


  public replenishBalance() {
    this.router.navigateByUrl('balance/replenish', {queryParams: {'numberCurrentBalance': this.balanceOfUser.numberOfBalance}});
  }

  public withdraw() {
    this.router.navigateByUrl('balance/withdraw', {
      queryParams: {
        'numberCurrentBalance': this.balanceOfUser.numberOfBalance,
        'availableBalance': this.balanceOfUser.money
      }
    });
  }

  private init() {
    this.app.currentUser.subscribe(x => {
      this.currentUser = x;
      this.balanceOfUser = new Balance();
      this.balanceService.getBalanceOfCurrentUser(this.currentUser.id).subscribe(resp => {
        this.balanceOfUser.numberOfBalance = resp.numberOfBalance;
        this.balanceOfUser.money = resp.money;
        this.balanceOfUser.isLock = resp.isLock;
        this.balanceOfUser.userId = resp.userId;
      }, err => this.errBalance = err.error.message);
    });

  }
}
