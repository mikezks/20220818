/* eslint-disable no-restricted-syntax */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HydrationManagerActions } from '../+state/hydration-manager';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  expertMode = false;
  needsLogin$: Observable<boolean> | undefined;
  _userName = '';

  get userName(): string {
    return this._userName;
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store) {}

  changed($event: CustomEvent): void {
    console.debug('$event.detail ', $event.detail);

    this.expertMode = $event.detail;
  }

  ngOnInit() {
    this.needsLogin$ = this.route.params.pipe(
      map((params) => !!params['needsLogin'])
    );
  }

  login(): void {
    this._userName = 'Login will be implemented in another exercise!';
  }

  logout(): void {
    this._userName = '';
  }

  manageHydration(action: 'WRITE' | 'READ' | 'RESET') {
    this.store.dispatch(
      action === 'WRITE' ? HydrationManagerActions.hydrateState() :
      action === 'RESET' ? HydrationManagerActions.resetState() :
      HydrationManagerActions.rehydrateState()
    );
  }
}
