import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "app/pages/home/home.component";
import { DefaultComponent } from "./default.component";

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent, // Composant "shell" ou "layout"
        children: [
          { path: 'home', component: HomeComponent }, // Route pour la page d'accueil
          { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirection vers 'home' si le chemin est vide
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DefaultRoutingModule { }