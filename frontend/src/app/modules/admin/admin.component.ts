import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: ` <div>
    <app-header
      [showSidebar]="showSidebar"
      (onChangeDisplaySidebar)="handleShowSidebarChange($event)"
      (onChangeDisplaySearchbar)="handleChangeDisplaySearchbar($event)"
    />

    <section
      [className]="
        showSidebar
          ? '  relative p-4 bg-stone-100 min-h-screen shadow-2xl w-auto '
          : 'relative p-4 bg-stone-100 min-h-screen w-auto '
      "
    >
      <router-outlet />
    </section>
  </div>`,
})
export class AdminComponent implements OnInit {
  title = 'Authentification';
  protected showSidebar: boolean = true;
  protected showSearchbar: boolean = false;

  ngOnInit(): void {
    const body = document.querySelector('body');
    if (body && body.getBoundingClientRect().width < 900) {
      this.showSidebar = false;
    } else {
      this.showSidebar = true;
    }
  }
  handleShowSidebarChange(value: boolean) {
    this.showSidebar = value;
  }
  handleChangeDisplaySearchbar(value: boolean) {
    this.showSearchbar = value;
  }
}
