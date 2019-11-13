import {Component, OnInit} from '@angular/core';
import {User} from '../users/users';
import {UserService} from '../users/user.service';
import {Role} from '../enum/role';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  createUser: User;

  constructor(private userService: UserService, private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.createUser = new User();
  }


  public createUserFunc(user: User) {
    user.roleId = Role.USER;
    this.userService.registerNewUser(user).subscribe(r => {
      this.snackBar.open('Пользователь успешно создан', null, {duration: 2000});
      this.router.navigate(['/login']);
    });

  }

}
