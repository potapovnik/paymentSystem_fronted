import {Component, OnInit} from '@angular/core';
import {PaymentService} from './payment.service';
import {Company} from '../entity/company';
import {PaymentCompany} from '../entity/paymentCompany';
import {PaymentUser} from '../entity/paymentUser';
import {TransferDto} from '../entity/transferDto';
import {BalanceService} from '../balance/balance.service';
import {Operation} from '../enum/operation';
import {Payment} from '../entity/payment';
import {Journal} from '../entity/journal';
import {Balance} from '../balance/balance';
import {User} from '../users/users';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {AppService} from '../AppService';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  allCompany: Company[];
  allPaymentOfCompany: PaymentCompany[];
  selectedPaymentOfCompany: PaymentCompany;
  selectedCompany: Company;
  numberOfCard: string;
  moneyForCardAndBalance: number;
  numberOfCardForBandC: string;
  currentBalance: Balance;
  currentUser: User;
  select = false;

  constructor(private paymentService: PaymentService, private balanceService: BalanceService,
              private snackBar: MatSnackBar, private app: AppService) {
    this.currentUser = null;
    this.app.currentUser.subscribe(x => this.currentUser = x);
    this.currentBalance = JSON.parse(localStorage.getItem('balance'));
    this.getAllCompany();
  }

  ngOnInit() {
  }

  getAllCompany() {
    this.paymentService.getAllCompany().subscribe(resp => this.allCompany = resp);
  }

  getAllPaymentOfCompany(company: Company) {
    this.paymentService.getAllPaymentCompany(company.id).subscribe(resp => {
      this.allPaymentOfCompany = resp;
      this.reloadPaymentOfCompany();
      this.selectedCompany = company;
    });
  }

  selectPaymentOfCompany(paymentCompany: PaymentCompany) {
    this.selectedPaymentOfCompany = paymentCompany;
    this.select = true;
  }

  reloadPaymentOfCompany() {
    this.allPaymentOfCompany = [...this.allPaymentOfCompany];
  }

  paymentFromBalance() {
    const newPaymentUser = new PaymentUser();
    newPaymentUser.userId = this.currentUser.id;
    newPaymentUser.paymentId = this.selectedPaymentOfCompany.id;
    const newTransfer = new TransferDto();
    newTransfer.fromBalance = this.currentBalance.numberOfBalance;
    this.balanceService.getBalance(this.selectedCompany.balanceId).subscribe(resp => {
      newTransfer.toBalance = resp.numberOfBalance;
      newTransfer.journal = new Journal();
      newTransfer.journal.money = this.selectedPaymentOfCompany.amount;
      newTransfer.journal.operationId = Operation.PAYMENT_FROM_BALANCE_TO_BALANCE;
      const payment = new Payment();
      payment.paymentUser = newPaymentUser;
      payment.transfer = newTransfer;
      this.paymentService.addPaymentFromBalance(payment).subscribe(r => {
        this.snackBar.open('Услуга оплачена успешно', null, {duration: 1000});
      });
    });
  }

  paymentFromCard() {
    const newPaymentUser = new PaymentUser();
    if (this.currentUser === null) {
      newPaymentUser.userId = null;
    } else {
      newPaymentUser.userId = this.currentUser.id;
    }
    newPaymentUser.paymentId = this.selectedPaymentOfCompany.id;
    const newTransfer = new TransferDto();
    newTransfer.fromBalance = this.numberOfCard;
    this.balanceService.getBalance(this.selectedCompany.balanceId).subscribe(resp => {
      newTransfer.toBalance = resp.numberOfBalance;
      newTransfer.journal = new Journal();
      newTransfer.journal.money = this.selectedPaymentOfCompany.amount;
      newTransfer.journal.operationId = Operation.PAYMENT_FROM_CARD_TO_BALANCE;
      const payment = new Payment();
      payment.paymentUser = newPaymentUser;
      payment.transfer = newTransfer;
      this.paymentService.addPaymentFromCard(payment).subscribe(r => {
        this.snackBar.open('Услуга оплачена успешно', null, {duration: 1000});
      });
    });
  }

  paymentFromCardAndBalance() {
    // Часть оплаты с баланса
    const newPaymentUser = new PaymentUser();
    newPaymentUser.userId = this.currentUser.id;
    newPaymentUser.paymentId = this.selectedPaymentOfCompany.id;
    const newTransfer = new TransferDto();
    newTransfer.fromBalance = this.currentBalance.numberOfBalance;
    this.balanceService.getBalance(this.selectedCompany.balanceId).subscribe(resp => {
      newTransfer.toBalance = resp.numberOfBalance;
      newTransfer.journal = new Journal();
      newTransfer.journal.money = this.moneyForCardAndBalance;
      newTransfer.journal.operationId = Operation.PAYMENT_FROM_CARD_AND_BALANCE_TO_BALANCE;
      const payment = new Payment();
      payment.paymentUser = newPaymentUser;
      payment.transfer = newTransfer;
      this.paymentService.addPaymentFromBalance(payment).subscribe(r => {
        // Часть оплаты с карты
        newPaymentUser.userId = this.currentUser.id;
        newPaymentUser.paymentId = this.selectedPaymentOfCompany.id;
        newTransfer.fromBalance = this.numberOfCardForBandC;
        newTransfer.toBalance = resp.numberOfBalance;
        newTransfer.journal = new Journal();
        newTransfer.journal.money = this.selectedPaymentOfCompany.amount - this.moneyForCardAndBalance;
        newTransfer.journal.operationId = Operation.PAYMENT_FROM_CARD_AND_BALANCE_TO_BALANCE;
        payment.paymentUser = newPaymentUser;
        payment.transfer = newTransfer;
        this.paymentService.addPaymentFromCard(payment).subscribe(r => {
          this.snackBar.open('Услуга оплачена успешно', null, {duration: 1000});
        });
      });
    });
  }
}
