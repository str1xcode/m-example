import { createSelector } from 'reselect';

export const getNavState = (state) => state.get('nav');

export const getCurrentRoute = createSelector([getNavState], (navState) => {
  const routeName = navState.get('routes').get(navState.get('index')).get('routeName');
  return routeName;
});
