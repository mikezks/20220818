import { TestBed } from '@angular/core/testing';
import { FlightService } from '@flight-workspace/flight-lib';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { flightsLoad, flightsLoaded } from './flight-booking.actions';
import { cold, hot } from 'jasmine-marbles';
import { FlightBookingEffects } from './flight-booking.effects';
//
describe('FlightBookingEffects', () => {
  let actions$: Observable<Action>;
  let effects: FlightBookingEffects;
  let flightService: FlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FlightBookingEffects,
        provideMockActions(() => actions$),
        {
          provide: FlightService,
          useValue: {
            find: jest.fn()
          }
        }

      ]
    });

    effects = TestBed.inject(FlightBookingEffects);
    flightService = TestBed.inject(FlightService);
  });

  it('should return action flightsLoaded', () => {
    const filter = { from: 'Graz', to: 'Hamburg', urgent: false };
    const flightsLoadAction = flightsLoad(filter);
    const flights = [{ id: 1, from: 'Graz', to: 'Hamburg', date: 'my date', delayed: false }];
    const flightsLoadedAction = flightsLoaded({ flights });

    actions$ = hot('-a', { a: flightsLoadAction });
    const serviceResponse = cold('-f|', { f: flights });
    const expected = cold('--r', { r: flightsLoadedAction });
    flightService.find = jest.fn(() => serviceResponse);

    expect(effects.loadFlights$).toBeObservable(expected);
  });
});
