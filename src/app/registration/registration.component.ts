import {Component, OnInit} from '@angular/core';
import {User} from '../users/users';
import {UserService} from '../users/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  createUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.createUser = new User();
  }


  public createUserFunc(user: User) {
    user.roleId = 2;
    this.userService.registerNewUser(user).subscribe();
  }

}
