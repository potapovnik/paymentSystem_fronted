import {Component, OnInit} from '@angular/core';
import {PaymentService} from './payment.service';
import {Company} from '../entity/company';
import {PaymentCompany} from '../entity/paymentCompany';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  allCompany: Company[];
  allPaymentOfCompany: PaymentCompany[];

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.getAllCompany();
  }

  getAllCompany() {
    this.paymentService.getAllCompany().subscribe(resp => this.allCompany = resp);
  }
  getAllPaymentOfCompany(idCompany: number) {
    this.paymentService.getAllPaymentCompany(idCompany).subscribe(resp => this.allPaymentOfCompany = resp);
  }
}
