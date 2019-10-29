import {Component, OnInit} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Journal} from '../../entity/journal';
import {BalanceService} from '../balance.service';
import {TransferDto} from '../../entity/transferDto';
import {Operation} from '../../enum/operation';
import {Balance} from '../balance';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  balanceToWithdraw: string;
  cardToWithdraw: string;
  moneyForCard: number;
  moneyForBalance: number;
  messageWithdrawToCard: string;
  messageWithdrawToBalance: string;
  numberCurrentBalance: string;
  availableBalance: number;

  constructor(private balanceService: BalanceService, private location: PlatformLocation, private route: ActivatedRoute) {
    this.balanceService.getBalanceOfCurrentUser(1).subscribe(resp => {
      this.numberCurrentBalance = resp.numberOfBalance;
      this.availableBalance = resp.money;
    }); // todo изменить на айди тек.пользователя
  }

  ngOnInit() {
  }

  transferOnBalance() {
    const transfer = new TransferDto();
    transfer.journal = new Journal();
    transfer.fromBalance = this.numberCurrentBalance;
    transfer.toBalance = this.balanceToWithdraw;
    transfer.journal.money = this.moneyForBalance;
    transfer.journal.operationId = Operation.BALANCE_TO_BALANCE;
    transfer.journal.time = new Date();
    transfer.journal.transferText = this.messageWithdrawToBalance;
    this.balanceService.withdrawFromBalanceOnBalance(transfer).subscribe();
  }

  transferOnCard() {
    const transfer = new TransferDto();
    transfer.journal = new Journal();
    transfer.fromBalance = this.numberCurrentBalance;
    transfer.toBalance = this.cardToWithdraw;
    transfer.journal.money = this.moneyForCard;
    transfer.journal.operationId = Operation.TRANSFER_TO_CARD;
    transfer.journal.time = new Date();
    transfer.journal.transferText = this.messageWithdrawToCard;
    this.balanceService.withdrawFromBalanceOnCard(transfer).subscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
