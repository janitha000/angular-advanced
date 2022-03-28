import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-can-activate',
  template: `<h4>THis is the parent component</h4>
    <router-outlet></router-outlet>`,
})
export class CanActivateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: 'app-can-activate-child1',
  template: `<p>This is child 1 component</p>`,
})
export class CanActivateChild1Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: 'app-can-activate-child2',
  template: `<p>This is child 2 component</p>`,
})
export class CanActivateChild2Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
