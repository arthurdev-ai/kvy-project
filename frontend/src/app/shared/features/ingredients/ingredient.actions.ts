import { createActionGroup, props } from '@ngrx/store';
// Importe le model "Recette"
import { Ingredient } from './ingredient.model';

export const IngredientActions = createActionGroup({
  source: 'ingredients',
  events: {
    'add ingredient': props<{ data: Ingredient }>(),
    'update ingredient': props<{ ingredientId: string; data: Ingredient }>(),
    'delete ingredient': props<{ ingredientId: string }>(),
    'get ingredient': props<{ ingredientId: string }>(),
    'get ingredients': props<{
      ingredients: ReadonlyArray<Ingredient>;
    }>(),
  },
});
