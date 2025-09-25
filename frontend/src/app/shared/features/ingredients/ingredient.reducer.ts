import { createReducer, on } from '@ngrx/store';

import { IngredientActions } from './ingredient.actions';
import { Ingredient } from './ingredient.model';

// Les filtres pour le ingredient

export type IngredientState = {
  ingredients: ReadonlyArray<Ingredient>;
  ingredient: Ingredient | null;
  loading: boolean;
  errorIngredients: boolean;
  errorIngredient: boolean;
  totalPage: number;
  page: number;
  totalIngredient: number;
  pageSize: number;
};

const initialState: IngredientState = {
  ingredients: [],
  loading: false,
  ingredient: null,
  errorIngredients: false,
  errorIngredient: false,
  totalPage: 0,
  page: 1,
  totalIngredient: 0,
  pageSize: 2,
};

export const ingredientReducer = createReducer(
  initialState,
  on(IngredientActions.addIngredient, (state, { data }) => ({
    ...state,
    ingredients: [...state.ingredients, data],
  })),
  on(IngredientActions.deleteIngredient, (state, { ingredientId }) => ({
    ...state,
    ingredients: state.ingredients.filter((item) => item.id !== ingredientId),
  })),
  on(IngredientActions.getIngredient, (state, { ingredientId }) => {
    const itemIngredient = state.ingredients.filter(
      (item) => item.id === ingredientId
    )[0];
    return {
      ...state,
      ...(itemIngredient && { ingredient: itemIngredient }),
    };
  }),
  on(IngredientActions.getIngredients, (state, { ingredients }) => {
    return {
      ...state,
      ingredients: ingredients,
    };
  })
);
