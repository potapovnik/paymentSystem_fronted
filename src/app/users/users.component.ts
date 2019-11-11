import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {User} from './users';
import {UserService} from './user.service';
import {BalanceService} from '../balance/balance.service';
import {TransferDto} from '../entity/transferDto';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ChangePasswordComponent} from './change-password/change-password.component';


@Pipe({name: 'numberOfCard'})
export class NumberOfCard implements PipeTransform {
  transform(number: string) {
    if (number === null) {
      return 'карта';
    } else {
      return number;
    }
  }
}

export interface DialogData {
  user: User;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  allUsers: User[];
  selectedUser: User;
  createUser: User;
  journal: TransferDto[];

  constructor(public dialog: MatDialog, private userService: UserService,
              private balanceService: BalanceService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.selectedUser = new User();
    this.createUser = new User();
    this.getAllUsers();
  }

  public selectUser(user: User) {
    this.selectedUser = user;
  }

  public getAllUsers() {
    this.userService.getAllUsers().subscribe(resp => this.allUsers = resp);
  }

  public createUserFunc(user: User) {
    this.userService.createUser(user).subscribe(resp => this.balanceService.createBalanceOfCurrentUser(user.id).subscribe);
  }

  public deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe();
  }

  public updateUser(user: User) {
    this.userService.updateUser(user).subscribe();
  }

  showHistoryOfUser(id: number) {
    this.userService.getJournalOfUser(id).subscribe(resp => {
      this.journal = resp;
      this.reloadData();
    });

  }

  public lockBalance(id: number, isLock: boolean) {
    if (isLock === true) {
      this.balanceService.lockBalance(id).subscribe();
    } else {
      this.balanceService.unlockBalance(id).subscribe();
    }
    this.snackBar.open('Баланс Заблокирован', null, {duration: 1000});

  }

  reloadData() {
    this.journal = [...this.journal];
  }

  openChangePasswordWindow() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '250px',
      data: {user: this.selectedUser}
    });
  }
}
