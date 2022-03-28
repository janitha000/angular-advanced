import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-can-load',
  template: `<h4>This is can load component home</h4>
    <p>Can load will check whether we need to module itself.</p>
    <p>Pre loading will improve performance since lazy modules will be download behind the scene before they are being used</p>`,
})
export class CanLoadComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
