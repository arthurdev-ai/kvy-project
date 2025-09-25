import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Grocery';

  // store = inject(TodosStore);

  // ngOnInit(): void {
  //   this.loadTodos()
  //     .then(() => console.log("Todos Loaded"))
  // }

  // async onAddTodo(title: string) {
  //   await this.store.addTodo(title)
  // }

  // async loadTodos() {
  //   await this.store.loadAll();
  // }
}
