import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultRoutingModule } from './default-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { recetteReducer } from 'app/shared/features/recettes/recette.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({ recettes: recetteReducer }),
    DefaultRoutingModule
  ],
  providers: []

})
export class DefaultModule { }
