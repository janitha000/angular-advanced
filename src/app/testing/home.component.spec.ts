import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from '../home/home.component';

describe('HomeComponent', () => {
  let homeComponent: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(homeComponent).toBeTruthy();
  });

  it('should have div with class .home', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.home')).toBeTruthy();
  });

  it('should contain header Home', () => {
    const element: HTMLElement = fixture.nativeElement;
    const h4 = element.querySelector('h4');
    expect(h4?.textContent).toEqual('Home');
  });

  //use debugElement when possible
  it('should contain header Home - debugElement', () => {
    const element: DebugElement = fixture.debugElement;
    const h4DE = element.query(By.css('h4'));
    const h4: HTMLElement = h4DE.nativeElement;
    expect(h4?.textContent).toEqual('Home');
  });

  it('should contain Life Cycle Hooks', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Life Cycle Hooks');
  });

  it('should have 15 links', () => {
    const lists = fixture.debugElement.queryAll(By.css('a'));
    expect(lists.length).toEqual(20);
  });
});
