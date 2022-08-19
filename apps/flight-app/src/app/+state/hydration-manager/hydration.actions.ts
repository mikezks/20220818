import { createActionGroup, emptyProps } from "@ngrx/store";

export const HydrationManagerActions = createActionGroup({
  source: 'Hydration Manager',
  events: {
    'Hydrate State': emptyProps(),
    'Rehydrate State': emptyProps(),
    'Reset State': emptyProps()
  }
});
