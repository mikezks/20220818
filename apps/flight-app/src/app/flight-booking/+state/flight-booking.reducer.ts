import { Flight } from '@flight-workspace/flight-lib';
import { createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[];
  filter: {
    from: string,
    to: string,
    urgent: boolean
  },
  // NEW:
  passenger: Record<
    number,
    {
      id: number,
      name: string,
      firstName: string
    }>;
  bookings: {
    passengerId: number,
    flightId: number
  }[];
  user: {
    name: string,
    passengerId: number
  };
}

export const initialState: State = {
  flights: [],
  filter: {
    from: 'Hamburg',
    to: 'Graz',
    urgent: false
  },
  passenger: {
    1: { id: 1, name: 'Smith', firstName: 'Anne' }
  },
  bookings: [
    { passengerId: 1, flightId: 3 },
    { passengerId: 1, flightId: 4 },
    { passengerId: 1, flightId: 5 }
  ],
  user: { name: 'anne.smith', passengerId: 1 }
};

export interface FlightBookingRootState {
  flightBooking: State;
}

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.filterUpdate, (state, action) => {
    return { ...state, filter: {
      from: action.from,
      to: action.to,
      urgent: action.urgent
    }};
  }),
  on(FlightBookingActions.flightsLoaded, (state, action) => {
    const flights = action.flights;
    return { ...state, flights };
  }),
  on(FlightBookingActions.flightUpdate, (state, action) => {
    const flights = state.flights.map(
      flight => action.flight.id === flight.id ? action.flight : flight
    );
    return { ...state, flights };
  }),

);
