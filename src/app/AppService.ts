import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from './users/user.service';
import {BalanceService} from './balance/balance.service';

@Injectable()
export class AppService {

  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get(  '/paymentSystem/user/current', {headers: headers}).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;

      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }

}
