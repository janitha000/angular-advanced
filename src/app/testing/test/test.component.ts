import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { City, TestService } from './test.service';

@Component({
  selector: 'app-test',
  template: `<h4>This is test component</h4>
    <div *ngFor="let city of cities">
      <p>{{ city.name }}</p>
      <p>{{ city.zipCode }}</p>
    </div>
    <div *ngFor="let city of cities$ | async">
      <p>{{ city.name }}</p>
      <p>{{ city.zipCode }}</p>
    </div>`,
})
export class TestComponent implements OnInit {
  cities!: City[];
  cities$!: Observable<City[]>;

  constructor(private service: TestService) {}

  ngOnInit() {
    this.cities = this.service.getTestObjects();
    this.cities$ = this.service.getTestObjectsObs();
  }
}
