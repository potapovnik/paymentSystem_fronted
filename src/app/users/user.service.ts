import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './users';
import {TransferDto} from '../entity/transferDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = '/paymentSystem/user';
  private head = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    const url = this.users + '/all';
    console.log(url + '- get all user');
    return this.http.get<User[]>(url, {headers: this.head});
  }

  createUser(user: User): Observable<User> {
    const url = this.users;
    console.log(url + '- post user ');
    return this.http.post<User>(url, user, {headers: this.head});
  }

  updateUser(user: User): Observable<User> {
    const url = this.users;
    console.log(url + '- update user ');
    return this.http.put<User>(url, user, {headers: this.head});
  }

  deleteUser(id: number): Observable<User[]> {
    const url = this.users + '?id=' + id;
    console.log(url + '- delete user ');
    return this.http.delete<User[]>(url, {headers: this.head});
  }

  getJournalOfUser(id: number): Observable<TransferDto[]> {
    const url = this.users + '/journalOfUser' + '?id=' + id;
    console.log(url + '-get journal of user ');
    return this.http.get<TransferDto[]>(url, {headers: this.head});
  }
}
