import { createSelector } from '@ngrx/store';
import { flightBookingFeature } from './flight-booking.reducer';


export const selectActiveUserFlights = createSelector(
  // Selectors
  flightBookingFeature.selectFlights,
  flightBookingFeature.selectBookings,
  flightBookingFeature.selectUser,
  // Projectors
  (flights, bookings, user) => {
    const activeUserPassengerId = user.passengerId;
    const activeUserFlightIds = bookings
      .filter(b => b.passengerId === activeUserPassengerId)
      .map(b => b.flightId);
    const activeUserFlights = flights
      .filter(f => activeUserFlightIds.includes(f.id));
    return activeUserFlights;
  }
);
