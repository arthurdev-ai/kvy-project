import { createActionGroup, props } from '@ngrx/store';
// Importe le model "Recette"
import { Recette } from './recette.model';

export const RecetteActions = createActionGroup({
  source: 'recettes',
  events: {
    'add recette': props<{ data: Recette }>(),
    'add recette success': props<{ data: Recette }>(),
    'add recette failed': props<{ data: Recette }>(),
    'update recette': props<{ recetteId: string; data: Recette }>(),
    'delete recette': props<{ recetteId: string }>(),
    'get recette': props<{ recetteId: string }>(),
    'get recette success': props<{ data: Recette }>(),
    'get recette failed': props<{ error: any }>(),
    'get recettes failed': props<{ error: any }>(),
    'get recettes': props<{
      recettes: ReadonlyArray<Recette>;
      totalPage: number;
      page: number;
      totalRecette: number;
      pageSize: number;
    }>(),
  },
});
