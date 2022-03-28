import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestComponent } from './test.component';
import { City, TestService } from './test.service';

let mockService: Partial<TestService>;

let fakeCities: City[] = [
  { name: 'Gampaha', zipCode: 20000 },
  { name: 'Kaluthara', zipCode: 10000 },
];

describe('Test Component', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should have header', () => {
    const header = fixture.nativeElement.querySelector('h4');
    expect(header.textContent).toBe('This is test component');
  });

  it('Should show default cities', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Kandy');
    expect(element.textContent).toContain('Matara');
  });

  it('Should show default cities from obs', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Kandy$');
    expect(element.textContent).toContain('Matara$');
  });
});

describe('Test Component with mock service', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let service: TestService;
  let seviceStub: any;

  beforeEach(async () => {
    seviceStub = jasmine.createSpyObj('TestService', ['getTestObjects', 'getTestObjectsObs']);
    seviceStub.getTestObjects.and.returnValue(fakeCities);
    seviceStub.getTestObjectsObs.and.returnValue(of(fakeCities));
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [{ provide: TestService, useValue: seviceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TestService);
    fixture.detectChanges();
  });

  it('Should show fake cities', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Gampaha');
    expect(element.textContent).toContain('Kaluthara');
  });

  it('Should call getTestObjects only once ', () => {
    expect(seviceStub.getTestObjects).toHaveBeenCalled();
    expect(seviceStub.getTestObjects).toHaveBeenCalledTimes(1);
  });

  it('Should call getTestObjects$ only once ', () => {
    expect(seviceStub.getTestObjectsObs).toHaveBeenCalled();
    expect(seviceStub.getTestObjectsObs).toHaveBeenCalledTimes(1);
  });
});
