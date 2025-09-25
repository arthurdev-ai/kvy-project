import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Ingredient } from './ingredient.model';
import { IngredientState } from './ingredient.reducer';

export const selectIngredients =
  createFeatureSelector<IngredientState>('ingredients');
export const selectAllIngredients = createSelector(
  selectIngredients,
  (state: IngredientState) =>  {
    console.log(state)
    return state.ingredients
  }
);
export const selectPaginationIngredient = createSelector(
  selectIngredients,
  (state: IngredientState) => {
    return {
      totalPage: state.totalPage,
      page: state.page,
      totalIngredient: state.totalIngredient,
      pageSize: state.pageSize,
    };
  }
);
