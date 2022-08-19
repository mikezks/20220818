import { Flight } from '@flight-workspace/flight-lib';
import { createAction, createActionGroup, props } from '@ngrx/store';


export const searchTrigger = createAction(
  '[FlightBooking] Search trigger',
  props<{ from: string, to: string, urgent: boolean }>()
);

export const filterUpdate = createAction(
  '[FlightBooking] Filter update',
  props<{ from: string, to: string, urgent: boolean }>()
);

export const flightsLoad = createAction(
  '[FlightBooking] Flights load',
  props<{ from: string, to: string, urgent: boolean }>()
);

export const flightsLoaded = createAction(
  '[FlightBooking] Flights loaded',
  props<{ flights: Flight[] }>()
);

export const flightUpdate = createAction(
  '[FlightBooking] Flight update',
  props<{ flight: Flight }>()
);

/* export const loadFlightBookingsFailure = createAction(
  '[FlightBooking] Load FlightBookings Failure',
  props<{ error: any }>()
); */

export const FlightBookingAction = createActionGroup({
  source: 'Flight Booking',
  events: {
    'Search Trigger': props<{ from: string, to: string, urgent: boolean }>(),
    'Filter update': props<{ from: string, to: string, urgent: boolean }>()
  }
});
