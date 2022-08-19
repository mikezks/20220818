import { RouterState } from '@angular/router';
import { getSelectors, routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { hydrationManager } from './hydration-manager';

export const ROUTER_STATE_KEY = 'router';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {
  [ROUTER_STATE_KEY]: RouterState
}

export const reducers: ActionReducerMap<State> = {
  [ROUTER_STATE_KEY]: routerReducer
};

const hydrationSetup = hydrationManager<State>(ROUTER_STATE_KEY);
export const metaReducers: MetaReducer<State>[] = !environment.production ? [hydrationSetup] : [hydrationSetup];

export const selectRouterState = createFeatureSelector<RouterReducerState>('router');

export const { selectRouteParams } = getSelectors(selectRouterState);
