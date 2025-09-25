import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecetteService } from 'app/services/recette/recette.service';
import { RecetteListComponent } from 'app/shared/components/recette-list/recette-list.component';
import { RecetteActions } from 'app/shared/features/recettes/recette.actions';
import { selectAllRecettes } from 'app/shared/features/recettes/recette.selectors';

@Component({
  standalone: true,
  imports: [RecetteListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  protected current: number = 3;
  recettes$ = this.store.select(selectAllRecettes);

  constructor(private recetteService: RecetteService, private store: Store) {

  }
  // store = inject(RecettesStore);
  private interval = setInterval(() => {
    this.autoPlayHandle()
  }, 3000);
  onChange(e: any, index: number) {

    this.current = index;

  }
  loadDatas() {
    // await this.store.loadAll();
    // this.recetteService.getRecettes().subscribe((recettes) => { console.log(recettes  ); this.store.dispatch(RecetteActions.getRecettes({ recettes })) })
  }
  ngOnInit(): void {
    this.current = 1;
    this.interval;
    this.loadDatas()
    //   .then(() => console.log("Todos Loaded"))
  }
  addRecette() {
    // this.recetteService.postRecette({
    //   title: '',
    //   status: 'ONLINE',
    //   countryId: '',
    //   plates: [],
    //   thumbail: '',
    //   categoryId: '',
    //   created_at: '',
    //   updated_at: ''
    // }).subscribe((data) => this.store.dispatch(RecetteActions.addRecette({ data })))
  }
  autoPlayHandle() {
    this.current++;
    if (this.current == 5)
      this.current = 1;
  }
}
