import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TestService {
  cities: City[] = [
    { name: 'Kandy', zipCode: 20000 },
    { name: 'Colombo', zipCode: 10000 },
    { name: 'Galle', zipCode: 30000 },
    { name: 'Matara', zipCode: 35000 },
  ];
  constructor() {}

  getTestObjects() {
    return this.cities;
  }

  getTestObjectsObs() {
    return of(this.cities.map((city) => ({ name: `${city.name}$`, zipCode: city.zipCode })));
  }
}

export interface City {
  name: string;
  zipCode: number;
}
