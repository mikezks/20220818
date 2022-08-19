import { ActionReducer } from "@ngrx/store";
import { HydrationManagerActions } from "./hydration.actions";


export function hydrationManager<T>(routerStateKey: string) {
  return (reducer: ActionReducer<T>): ActionReducer<T> => {
    return (state, action) => {
      const newState = manageHydration(state, action.type, routerStateKey);
      return reducer(newState, action);
    };
  };
}

function manageHydration<T>(
  currentState: T,
  actionType: string,
  routerStateKey: string,
  stateHydrationKey = 'ngrxAppState'
): T {
  let useState = currentState;
  let stateStr: string | null;
  switch (actionType) {
    case HydrationManagerActions.hydrateState.type:
      localStorage.setItem(stateHydrationKey, JSON.stringify(currentState));
      break;
    case HydrationManagerActions.rehydrateState.type:
      stateStr = localStorage.getItem(stateHydrationKey);
      useState = stateStr && JSON.parse(stateStr) || useState;
      useState = patchRouterState(useState, currentState, routerStateKey);
      break;
    case HydrationManagerActions.resetState.type:
      localStorage.removeItem(stateHydrationKey);
      break;
  }
  return useState;
}

function patchRouterState<T>(hydratedState: T, currentState: T, routerStateKey: string): T {
  return {
    ...hydratedState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [routerStateKey]: (currentState as any)[routerStateKey]
  };
}
