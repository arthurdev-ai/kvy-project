import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'app/pages/auth/login/login.component';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'app/services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from 'app/pages/auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent }, // Route pour la page d'accueil

      { path: 'register', component: RegisterComponent }, // Route pour la page d'accueil
      { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection vers 'home' si le chemin est vide
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers: [AuthService],
})
export class AuthModule {}
