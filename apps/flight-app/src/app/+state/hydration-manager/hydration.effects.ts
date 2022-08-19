import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { HydrationManagerActions } from "./hydration.actions";


@Injectable()
export class HydrationManagerEffects {
  ngrxOnInitEffects(): Action {
    return HydrationManagerActions.rehydrateState();
  }
}
