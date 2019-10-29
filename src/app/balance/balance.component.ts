import {Component, OnInit} from '@angular/core';
import {Balance} from './balance';
import {BalanceService} from './balance.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  balanceOfUser: Balance;

  constructor(private balanceService: BalanceService, private router: Router) {
  }

  ngOnInit() {
    this.balanceOfUser = new Balance();
    this.balanceService.getBalanceOfCurrentUser(1).subscribe(resp => {
      this.balanceOfUser.numberOfBalance = resp.numberOfBalance;
      this.balanceOfUser.money = resp.money;
      this.balanceOfUser.isLock = resp.isLock;
      this.balanceOfUser.userId = resp.userId;
    }); // todo изменить на айди тек.пользователя
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

}
