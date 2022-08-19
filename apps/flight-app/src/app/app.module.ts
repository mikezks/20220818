import { FlightCancellingModule } from './flight-booking/flight-cancelling/flight-cancelling.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FlightLibModule } from '@flight-workspace/flight-lib';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { BasketComponent } from './basket/basket.component';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule, DefaultDataServiceConfig } from '@ngrx/data';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, metaReducers, ROUTER_STATE_KEY } from './+state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { PassengersModule } from './passengers/passengers.module';
import { defaultDataServiceConfig, entityConfig } from './+state/data';
import { PassengerDataModule } from './passenger-data/passenger-data.module';
import { HydrationManagerEffects } from './+state/hydration-manager/hydration.effects';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FlightBookingModule,
    PassengersModule,
    PassengerDataModule,

    BrowserAnimationsModule,
    FlightCancellingModule,

    FlightLibModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([HydrationManagerEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: ROUTER_STATE_KEY,
      routerState: RouterState.Minimal
    }),
    EntityDataModule.forRoot(entityConfig),
    !environment.production ? StoreDevtoolsModule.instrument({
      name: 'Flight App'
    }) : [],
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BasketComponent
  ],
  providers: [
    {
      provide: DefaultDataServiceConfig,
      useValue: defaultDataServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
