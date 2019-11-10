import {Component, OnInit} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Journal} from '../../entity/journal';
import {BalanceService} from '../balance.service';
import {TransferDto} from '../../entity/transferDto';
import {Operation} from '../../enum/operation';
import {Balance} from '../balance';
import {User} from '../../users/users';

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
  currentUser: User;
  errorTransferOnBalance: String;
  errorTransferOnCard: String;

  constructor(private balanceService: BalanceService, private location: PlatformLocation, private route: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.balanceService.getBalanceOfCurrentUser(this.currentUser.id).subscribe(resp => {
      this.numberCurrentBalance = resp.numberOfBalance;
      this.availableBalance = resp.money;
    });
  }

  ngOnInit() {

  }

  transferOnBalance() {
    this.errorTransferOnBalance = null;
    const transfer = new TransferDto();
    transfer.journal = new Journal();
    transfer.fromBalance = this.numberCurrentBalance;
    transfer.toBalance = this.balanceToWithdraw;
    transfer.journal.money = this.moneyForBalance;
    transfer.journal.operationId = Operation.BALANCE_TO_BALANCE;
    transfer.journal.transferText = this.messageWithdrawToBalance;
    this.balanceService.withdrawFromBalanceOnBalance(transfer).subscribe(r => {
      },
      err => this.errorTransferOnBalance = err.error.message);
  }

  transferOnCard() {
    this.errorTransferOnCard = null;
    const transfer = new TransferDto();
    transfer.journal = new Journal();
    transfer.fromBalance = this.numberCurrentBalance;
    transfer.toBalance = this.cardToWithdraw;
    transfer.journal.money = this.moneyForCard;
    transfer.journal.operationId = Operation.TRANSFER_TO_CARD;
    transfer.journal.transferText = this.messageWithdrawToCard;
    this.balanceService.withdrawFromBalanceOnCard(transfer).subscribe(r => {
      },
      err => {this.errorTransferOnCard = err.error.message;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
