import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-named-outlet',
  template: `<p>-------------------------</p>
    <h4>This is from the named outlet component</h4>
    <p>--------------------------</p>`,
})
export class NamedOutletComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
