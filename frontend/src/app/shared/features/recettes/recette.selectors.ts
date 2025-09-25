import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Recette } from "./recette.model";
import { RecetteState } from "./recette.reducer";

export const selectRecettes = createFeatureSelector<RecetteState>('recettes')
export const selectAllRecettes = createSelector(
    selectRecettes,
    (state: RecetteState) => state.recettes
);
export const selectRecette = createSelector(
    selectRecettes,
    (state: RecetteState) => state.recette
)
export const selectPaginationRecette = createSelector(
    selectRecettes,
    (state: RecetteState) => {
        return {
            totalPage: state.totalPage,
            page: state.page,
            totalRecette: state.totalRecette,
            pageSize: state.pageSize,
        }
    }
);
