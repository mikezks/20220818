import { Injectable } from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs';
import * as ActionsLegacy from './flight-booking.actions';


@Injectable()
export class FlightBookingEffects {

  searchTrigger$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsLegacy.FlightBookingAction.searchTrigger),
      mergeMap(action => [
        ActionsLegacy.filterUpdate({
          from: action.from,
          to: action.to,
          urgent: action.urgent
        }),
        ActionsLegacy.flightsLoad({
          from: action.from,
          to: action.to,
          urgent: action.urgent
        })
      ])
    )
  );

  loadFlights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsLegacy.flightsLoad),
      switchMap(action => this.flightService.find(
        action.from,
        action.to,
        action.urgent
      )),
      map(flights => ActionsLegacy.flightsLoaded({ flights }))
    )
  );


  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}
}
