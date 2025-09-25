import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'app/shared/components/header/header.component';
import { FooterComponent } from 'app/shared/components/footer/footer.component';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    template: `
            <app-header />
            <main class="min-h-screen bg-stone-100 py-20 ">
                <router-outlet></router-outlet>
            </main>
            <app-footer />
            `,
})
export class DefaultComponent {
    title = 'Atable';
}
