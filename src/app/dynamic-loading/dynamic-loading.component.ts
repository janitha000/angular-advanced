import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicDirective } from './dynamic.directive';

@Component({
  selector: 'app-dynamic',
  template: `<h2>Dynamic Loading Components</h2>
    <button (click)="onClick()">Click to change Comp</button>
    <ng-template dynamicHost></ng-template>
    <p>-------------------------</p>
    <app-dynamic-factory></app-dynamic-factory>`,
})
export class DynamicComponent implements OnInit {
  @ViewChild(DynamicDirective, { static: true }) dynamicHost!: DynamicDirective;
  dynamicItems: CompType[] = [
    { component: DynamicOneComponent, data: 'Janitha' },
    { component: DynamicTwoComponent, data: 'Vindya' },
  ];
  private index = 0;
  constructor() {}

  loadComponent(comp: CompType) {
    const viewRef = this.dynamicHost.viewContainerRef;
    viewRef.clear();

    const componentRef = viewRef.createComponent<CompType>(comp.component);
    componentRef.instance.data = comp.data;
  }

  onClick() {
    this.index = this.index === 0 ? 1 : 0;
    this.loadComponent(this.dynamicItems[this.index]);
  }

  ngOnInit() {
    this.loadComponent(this.dynamicItems[0]);
  }
}

//same dynamic loading using viewContainerRef using template variables
@Component({
  selector: 'app-dynamic-factory',
  template: `<h2>Dynamic Loading Components</h2>
    <button (click)="onClick()">Click to change Comp</button>
    <ng-template #compHost></ng-template> `,
})
export class DynamicFactoryComponent implements OnInit {
  @ViewChild('compHost', { static: true, read: ViewContainerRef }) container!: ViewContainerRef;
  changeComponent: boolean = true;
  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  onClick() {
    let comp = this.changeComponent ? DynamicOneComponent : DynamicTwoComponent;

    this.container.clear();
    const componentRef = this.container.createComponent(comp);
    componentRef.instance.data = 'Janitha';
  }
}

@Component({
  selector: 'app-dynamic-one',
  template: `<h2>This is first dynamic component</h2>
    <p>{{ data }}</p>`,
})
export class DynamicOneComponent implements OnInit {
  @Input() data!: string;
  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: 'app-dynamic-two',
  template: `<h2>This is second dynamic component</h2>
    <p>{{ data }}</p>`,
})
export class DynamicTwoComponent implements OnInit {
  @Input() data!: string;
  constructor() {}

  ngOnInit() {}
}

interface CompType {
  component: any;
  data: string;
}
