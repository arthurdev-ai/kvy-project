import { createReducer, on } from '@ngrx/store';

import { RecetteActions } from './recette.actions';
import { Recette } from './recette.model';

// Les filtres pour le recette

// En fonction du nombre de personnes
export type PlateFilter = 'ONE_PLATE' | 'TWO_PLATES' | 'FOUR_PLATES';

// Si les recettes ont été mise en ligne ou non
export type StatusFilter = 'ONLINE' | 'OFFLINE';

export type RecetteState = {
  recettes: ReadonlyArray<Recette>;
  recette: Recette | null;
  loading: boolean;
  errorRecettes: boolean;
  errorRecette: boolean;
  filterByPlate: PlateFilter;
  filterByStatus: StatusFilter;
  totalPage: number;
  page: number;
  totalRecette: number;
  pageSize: number;
};

const initialState: RecetteState = {
  recettes: [],
  loading: false,
  recette: null,
  filterByPlate: 'TWO_PLATES',
  errorRecettes: false,
  errorRecette: false,
  totalPage: 0,
  page: 0,
  totalRecette: 0,
  pageSize: 10,
  filterByStatus: 'OFFLINE',
};

export const recetteReducer = createReducer(
  initialState,
  on(RecetteActions.addRecette, (state, { data }) => ({
    ...state,
    recettes: [...state.recettes, data],
  })),
  on(RecetteActions.deleteRecette, (state, { recetteId }) => ({
    ...state,
    recettes: state.recettes.filter((item) => item.id !== recetteId),
  })),
  on(RecetteActions.getRecetteSuccess, (state, { data }) => {
    // const itemRecette = state.recettes.filter((item) => item.id === recetteId)[0];
    return {
      ...state,
      recette: data,
    };
  }),
  on(
    RecetteActions.getRecettes,
    (state, { recettes, totalPage, page, totalRecette, pageSize }) => ({
      ...state,
      recettes: recettes,
      totalPage: totalPage,
      page: page,
      totalRecette: totalRecette,
      pageSize: pageSize,
    })
  )
);
