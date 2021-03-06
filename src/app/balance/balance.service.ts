import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Balance} from './balance';
import {TransferDto} from '../entity/transferDto';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private balance = '/paymentSystem/balance';
  private transfer = '/paymentSystem/transfer';
  private head = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  lockBalance(id: number): Observable<boolean> {
    const url = this.balance + '/lock' + '?id=' + id;
    console.log(url + '- put lock balance');
    return this.http.put<boolean>(url, {headers: this.head});
  }

  unlockBalance(id: number): Observable<boolean> {
    const url = this.balance + '/unlock' + '?id=' + id;
    console.log(url + '- put unlock balance');
    return this.http.put<boolean>(url, {headers: this.head});
  }

  getBalanceOfCurrentUser(id: number): Observable<Balance> {
    const url = this.balance + '/byId' + '?idUser=' + id;
    console.log(url + '- get all balance of current user');
    return this.http.get<Balance>(url, {headers: this.head});
  }

  createBalanceOfCurrentUser(user_id: number): Observable<boolean> {
    const url = this.balance + '/forCreatedUser' + '?id=' + user_id;
    console.log(url + '- create balance for new user');
    return this.http.post<boolean>(url, {headers: this.head});
  }

  withdrawFromBalanceOnBalance(transfer: TransferDto): Observable<boolean> {
    const url = this.transfer + '/withdrawOnBalance';
    console.log(url + '- withdraw on other balance');
    return this.http.post<boolean>(url, transfer, {headers: this.head});
  }

  withdrawFromBalanceOnCard(transfer: TransferDto): Observable<boolean> {
    const url = this.transfer + '/withdrawOnCard';
    console.log(url + '- withdraw on card');
    return this.http.post<boolean>(url, transfer, {headers: this.head});
  }

  replenishFromCardOnBalance(transfer: TransferDto): Observable<boolean> {
    const url = this.transfer + '/replenishOnBalance';
    console.log(url + '- replenish on balance');
    return this.http.post<boolean>(url, transfer, {headers: this.head});
  }

  getBalance(id: number): Observable<Balance> {
    const url = this.balance + '?id=' + id;
    console.log(url + '- get balance with id');
    return this.http.get<Balance>(url, {headers: this.head});
  }
}
