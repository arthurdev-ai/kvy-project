import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public title = 'Connexion'; // Variable important
  errorMessage: string = '';
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  onSubmit() {
    if (this.userForm.valid) {
      if (this.userForm.value.username && this.userForm.value.password) {
        this.authService
          .logUser(this.userForm.value.username, this.userForm.value.password)
          .subscribe((data) => {
            if (data.token) {
              localStorage.setItem('user-auth', data.token);
              this.router.navigateByUrl('/app');
            } else {
              this.errorMessage = 'Erreur de connexion';
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
