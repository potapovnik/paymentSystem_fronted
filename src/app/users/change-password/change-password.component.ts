import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../users';
import {UserService} from '../user.service';

export interface DialogData {
  user: User;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasUser: User;
  constructor(private userService: UserService, public dialogRef: MatDialogRef<ChangePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.changePasUser = new User();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.changePasUser.id = this.data.user.id ;
    this.changePasUser.name = this.data.user.name;
    this.changePasUser.surname = this.data.user.surname;
    this.changePasUser.lastname = this.data.user.lastname;
    this.changePasUser.login = this.data.user.login;
    this.changePasUser.roleId = this.data.user.roleId;
    this.changePasUser.dob = this.data.user.dob;
    this.userService.updateUser(this.changePasUser).subscribe(result => this.dialogRef.close());
  }

}
