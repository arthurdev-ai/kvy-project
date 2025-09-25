import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() title: string = '';
  @Input() textClassName: string = 'text-white';
  @Input() variant: 'outline' | 'normal' | 'clear' = 'normal';
  @Input() rounded: 'full' | 'md' | 'sm' = 'sm';
  @Input() className: string = '';
  @Input() iconRight: boolean = false;
  @Input() colorScheme: 'primary' | 'secondary' | 'danger' = 'primary';
  @Output() onClick = new EventEmitter();

  handleClickButton(event: any) {
    this.onClick.emit(event);
  }
}
