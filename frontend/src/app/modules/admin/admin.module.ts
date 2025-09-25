import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from 'app/pages/admin/home-admin/home-admin.component';
import { AdminService } from 'app/services/admin/admin.service';
import { StoreModule } from '@ngrx/store';
import { recetteReducer } from 'app/shared/features/recettes/recette.reducer';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from 'app/shared/components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { categoryReducer } from 'app/shared/features/categories/category.reducer';
import { ingredientReducer } from 'app/shared/features/ingredients/ingredient.reducer';
import { ButtonComponent } from 'app/shared/components/button/button.component';
import { ListKycDocComponent } from 'app/pages/admin/list-kyc-doc/list-kyc-doc.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'home', component: HomeAdminComponent }, // Route pour la page d'accueil
      { path: 'documents', component: ListKycDocComponent }, // Route pour la page d'accueil

      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Route pour la page des recettes
    ],
  },
];

@NgModule({
  declarations: [HomeAdminComponent, PaginationComponent, ListKycDocComponent],
  imports: [
    CommonModule,
    ButtonComponent,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({
      recettes: recetteReducer,
      categories: categoryReducer,
      ingredients: ingredientReducer,
    }),
    ButtonComponent,
  ],
  providers: [AdminService, AdminService],
})
export class AdminModule {}
