import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { appGuard, authGuard } from './guards/auth/auth.guard';
// import { HomeComponent } from './layouts/home/home.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     loadChildren: () => import("./modules/default/default.module").then(m => m.DefaultModule)
    // },
    {
        path: '',
        loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule),
        canActivate: [authGuard]
    },
    {
        path: 'app',
        loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule),
        canActivate: [appGuard]
    }
];
