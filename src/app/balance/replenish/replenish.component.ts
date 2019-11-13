import {Component, OnInit} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {Balance} from '../balance';
import {TransferDto} from '../../entity/transferDto';
import {Journal} from '../../entity/journal';
import {Operation} from '../../enum/operation';
import {BalanceService} from '../balance.service';
import {isNumeric} from 'tslint';
import {User} from '../../users/users';
import {MatSnackBar} from '@angular/material';
import {AppService} from '../../AppService';

@Component({
  selector: 'app-replenish',
  templateUrl: './replenish.component.html',
  styleUrls: ['./replenish.component.scss']
})
export class ReplenishComponent implements OnInit {
  CardForReplenish: string;
  moneyForTransfer: number;
  messageForTransfer: string;
  numberCurrentBalance: string;
  isLock: boolean;
  currentUser: User;
  errorReplenish: string;

  constructor(private location: PlatformLocation, private balanceService: BalanceService,
              private snackBar: MatSnackBar, private app: AppService) {
    this.app.currentUser.subscribe(x => this.currentUser = x);
    this.balanceService.getBalanceOfCurrentUser(this.currentUser.id).subscribe(resp => {
      this.numberCurrentBalance = resp.numberOfBalance;
      this.isLock = resp.isLock;
    });
  }

  ngOnInit() {
  }

  transferFromCard() {
    this.errorReplenish = null;
    const transfer = new TransferDto();
    transfer.journal = new Journal();
    transfer.fromBalance = this.CardForReplenish;
    transfer.toBalance = this.numberCurrentBalance;
    transfer.journal.money = this.moneyForTransfer;
    transfer.journal.operationId = Operation.TRANSFER_FROM_CARD;
    transfer.journal.transferText = this.messageForTransfer;
    this.balanceService.replenishFromCardOnBalance(transfer).subscribe(resp => {
        this.snackBar.open('Перевод оформлен успешно', null, {duration: 1000});
      },
      err => this.errorReplenish = err.error.message);
  }

  goBack(): void {
    this.location.back();
  }
}
