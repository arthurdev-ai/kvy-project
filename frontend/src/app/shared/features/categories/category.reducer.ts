import { createReducer, on } from '@ngrx/store';

import { CategoryActions } from './category.actions';
import { Category } from './category.model';

// Les filtres pour le category

export type CategoryState = {
  categories: ReadonlyArray<Category>;
  category: Category | null;
  loading: boolean;
  errorCategories: boolean;
  errorCategory: boolean;
  totalPage: number;
  page: number;
  totalCategory: number;
  pageSize: number;
};

const initialState: CategoryState = {
  categories: [],
  loading: false,
  category: null,
  errorCategories: false,
  errorCategory: false,
  totalPage: 0,
  page: 1,
  totalCategory: 0,
  pageSize: 2,
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.addCategory, (state, { data }) => ({
    ...state,
    categories: [...state.categories, data],
  })),
  on(CategoryActions.deleteCategory, (state, { categoryId }) => ({
    ...state,
    categories: state.categories.filter((item) => item.id !== categoryId),
  })),
  on(CategoryActions.getCategory, (state, { categoryId }) => {
    const itemCategory = state.categories.filter(
      (item) => item.id === categoryId
    )[0];
    return {
      ...state,
      ...(itemCategory && { category: itemCategory }),
    };
  }),
  on(CategoryActions.getCategories, (state, { categories }) => {
    return {
      ...state,
      categories: categories,
    };
  })
);
