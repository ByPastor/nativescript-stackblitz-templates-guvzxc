import { Router } from '@angular/router';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user.model';
import { Component } from '@angular/core';

@Component({
  selector: 'gr-login',
  providers: [UserService],
  moduleId: module.id,
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user: User;
  isLoggingIn = true;

  constructor(private router: Router, private userService: UserService) {}
  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this.userService.login(this.user).subscribe(
      () => this.router.navigate(['/list']),
      (exception) => {
        if (exception.error && exception.error.description) {
          alert(exception.error.description);
        } else {
          alert(exception);
        }
      }
    );
  }

  signUp() {
    this.userService.register(this.user).subscribe(
      () => {
        alert('Cont creat cu succes.');
        this.toggleDisplay();
      },
      (exception) => {
        if (exception.error && exception.error.description) {
          alert(exception.error.description);
        } else {
          alert(exception);
        }
      }
    );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}
