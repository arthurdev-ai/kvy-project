import { createReducer, on } from "@ngrx/store";

import { RecetteActions } from "./auth.actions";
import { Recette } from "./auth.model";

// Les filtres pour le recette 

// En fonction du nombre de personnes
export type PlateFilter = "ONE_PLATE" | "TWO_PLATES" | "FOUR_PLATES";

// Si les recettes ont été mise en ligne ou non 
export type StatusFilter = "ONLINE" | "OFFLINE";

export type RecetteState = {
    recettes: ReadonlyArray<Recette>;
    recette: Recette | null;
    loading: boolean;
    errorRecettes: boolean;
    errorRecette: boolean;
    filterByPlate: PlateFilter;
    filterByStatus: StatusFilter;
}

const initialState: RecetteState = {
    recettes: [],
    loading: false,
    recette: null,
    filterByPlate: "TWO_PLATES",
    errorRecettes: false,
    errorRecette: false,
    filterByStatus: "OFFLINE",
}

export const recetteReducer = createReducer(initialState,
    on(RecetteActions.addRecette, (state, { data }) => ({
        ...state,
        recettes: [...state.recettes, data]
    })),
    on(RecetteActions.deleteRecette, (state, { recetteId }) => ({
        ...state,
        recettes: state.recettes.filter((item) => item.id !== recetteId)
    })),
    on(RecetteActions.getRecette, (state, { recetteId }) => {
        const itemRecette = state.recettes.filter((item) => item.id === recetteId)[0];
        return {
            ...state,
            ...(itemRecette && { recette: itemRecette })
        }
    }),
    on(RecetteActions.getRecettes, (state, { recettes }) => ({
        ...state,
        recettes: recettes
    }))
)