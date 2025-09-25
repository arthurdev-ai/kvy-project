import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Recette } from "./auth.model";
import { RecetteState } from "./auth.reducer";

export const selectRecettes = createFeatureSelector<RecetteState>('recettes')
export const selectAllRecettes = createSelector(
    selectRecettes,
    (state: RecetteState) => state.recettes
);
