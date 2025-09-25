import { Routes } from '@angular/router';
import { HomeComponent } from 'app/pages/home/home.component';
import { DefaultComponent } from './default.component';

export const defaultRoutes: Routes = [
    {
        component: DefaultComponent,
        children: [
            { path: 'home', component: HomeComponent }
        ]
    }
];
