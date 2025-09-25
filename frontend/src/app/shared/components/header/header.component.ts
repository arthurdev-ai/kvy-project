import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() showSidebar: boolean = true;
  @Output() onChangeDisplaySidebar = new EventEmitter<boolean>();
  @Output() onChangeDisplaySearchbar = new EventEmitter<boolean>();
}
