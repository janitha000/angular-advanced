import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of, Subject } from 'rxjs';
import { InteractionComponent, InteractionParentComponent } from '../component-interaction.ts/interaction.component';
import { InteractionService } from '../component-interaction.ts/interaction.service';
import { HomeComponent } from '../home/home.component';
import { LifecycleComponent, LifecycleParentComponent } from '../lifecycle/lifecycle.component';

let mockInteractionService: Partial<InteractionService>;

describe('Life Cycle Hook Component', () => {
  let component: InteractionParentComponent;
  let fixture: ComponentFixture<InteractionParentComponent>;
  let service: InteractionService;
  let serviceStub: any;

  beforeEach(async () => {
    mockInteractionService = {
      testVar: true,
      messageObs$: new Subject<string>(),
    };

    //fake spy
    serviceStub = jasmine.createSpyObj('InteractionService', ['sendMessage']);
    serviceStub.sendMessage.and.returnValue(of('Fake Message'));

    await TestBed.configureTestingModule({
      declarations: [InteractionParentComponent, InteractionComponent],
      //providers: [InteractionService]
      providers: [{ provide: InteractionService, useValue: mockInteractionService }], //provide a mock interaction service via the DI
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionParentComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(InteractionService);
  });

  it('should have service test var as true', () => {
    service.testVar = false;
    fixture.detectChanges();
    //do some expect
  });

  //fake spy
  it('should display fake message', () => {
    let button = fixture.debugElement.query(By.css('.button'));
    expect(button.nativeElement.textContent).toEqual('Send Message Child');
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    let el: HTMLElement = fixture.nativeElement;
    // expect(serviceStub.sendMessage.calls.any()).toBeTruthy();
  });
});
