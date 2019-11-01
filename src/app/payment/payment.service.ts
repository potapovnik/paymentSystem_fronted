import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../entity/company';
import {PaymentCompany} from '../entity/paymentCompany';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentCompany = '/paymentSystem/paymentCompany';
  private head = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getAllCompany(): Observable<Company[]> {
    const url = this.paymentCompany + '/allCompany';
    console.log(url + '-get all company for payment ');
    return this.http.get<Company[]>(url, {headers: this.head});
  }

  getAllPaymentCompany(idCompany: number): Observable<PaymentCompany[]> {
    const url = this.paymentCompany + '/allPaymentOfCompany/' + '?idCompany=' + idCompany;
    console.log(url + '-get all payment of company ');
    return this.http.get<PaymentCompany[]>(url, {headers: this.head});
  }
}
