import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'flight-workspace-passenger-data',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css'],
})
export class PassengerDataComponent {
  passengers$ = this.passengerService.entities$;
  loading$ = this.passengerService.loading$;

  constructor(private passengerService: PassengerService) {}

  load(): void {
    this.passengerService.getAll();
  }

  add(): void {
    this.passengerService.add({
      id: 0,
      firstName: 'John',
      name: 'Doe'
    });
  }
}
