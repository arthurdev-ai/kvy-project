import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public title = 'Inscription'; // Variable important
  errorMessage: string = '';
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  onSubmit() {
    if (this.userForm.valid) {
      if (
        this.userForm.value.username &&
        this.userForm.value.email &&
        this.userForm.value.password
      ) {
        this.authService
          .registerUser(
            this.userForm.value.username,
            this.userForm.value.email,
            this.userForm.value.password
          )
          .subscribe((data) => {
            if (!data.error) {
              this.router.navigateByUrl('/login');
            } else {
              this.errorMessage = data.message;
            }
          });
      }
    }
  }
  constructor(private authService: AuthService, private router: Router) {}
  onChangeEmailInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.authService.setEmailUser(inputElement.value);
  }
}
