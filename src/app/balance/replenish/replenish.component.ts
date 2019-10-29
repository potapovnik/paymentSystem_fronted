import {Component, OnInit} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {Balance} from '../balance';
import {TransferDto} from '../../entity/transferDto';
import {Journal} from '../../entity/journal';
import {Operation} from '../../enum/operation';
import {BalanceService} from '../balance.service';
import {isNumeric} from 'tslint';

@Component({
  selector: 'app-replenish',
  templateUrl: './replenish.component.html',
  styleUrls: ['./replenish.component.scss']
})
export class ReplenishComponent implements OnInit {
  balanceFromReplenish: number;
  CardForReplenish: string;
  moneyForTransfer: number;
  messageForTransfer: string;
  numberCurrentBalance: string;
  isLock: boolean;

  constructor(private location: PlatformLocation, private balanceService: BalanceService) {
  }

  ngOnInit() {
    this.balanceService.getBalanceOfCurrentUser(1).subscribe(resp => {
      this.numberCurrentBalance = resp.numberOfBalance;
      this.isLock = resp.isLock;
    }); // todo изменить на айди тек.пользователя
  }

  transferFromCard() {
    const transfer = new TransferDto();
    transfer.journal = new Journal();
    transfer.fromBalance = this.CardForReplenish;
    transfer.toBalance = this.numberCurrentBalance;
    transfer.journal.money = this.moneyForTransfer;
    transfer.journal.operationId = Operation.TRANSFER_FROM_CARD;
    transfer.journal.time = new Date();
    transfer.journal.transferText = this.messageForTransfer;
    this.balanceService.replenishFromCardOnBalance(transfer).subscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
