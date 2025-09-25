import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Category } from './category.model';
import { CategoryState } from './category.reducer';

export const selectCategories =
  createFeatureSelector<CategoryState>('categories');
export const selectAllCategories = createSelector(
  selectCategories,
  (state: CategoryState) => state.categories
);
export const selectPaginationCategory = createSelector(
  selectCategories,
  (state: CategoryState) => {
    return {
      totalPage: state.totalPage,
      page: state.page,
      totalCategory: state.totalCategory,
      pageSize: state.pageSize,
    };
  }
);
