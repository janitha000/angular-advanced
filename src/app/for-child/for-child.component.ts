import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PollingService } from './polling.service';

@Component({
  selector: 'app-for-child',
  template: `<p>Polling value: {{ timer$ | async }}</p>`,
})
export class ForChildComponent implements OnInit {
  timer$!: Observable<number>;
  constructor(private service: PollingService) {}

  ngOnInit() {
    this.timer$ = this.service.polling$;
  }
}
