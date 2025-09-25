import { createActionGroup, props } from '@ngrx/store';
// Importe le model "Recette"
import { Category } from './category.model';

export const CategoryActions = createActionGroup({
  source: 'categories',
  events: {
    'add category': props<{ data: Category }>(),
    'update category': props<{ categoryId: string; data: Category }>(),
    'delete category': props<{ categoryId: string }>(),
    'get category': props<{ categoryId: string }>(),
    'get categories': props<{
      categories: ReadonlyArray<Category>;
    }>(),
  },
});
