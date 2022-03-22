import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { LifecycleComponent, LifecycleParentComponent } from "../lifecycle/lifecycle.component";


describe('Life Cycle Hook Component', () => {
    let component: LifecycleParentComponent;
    let fixture: ComponentFixture<LifecycleParentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LifecycleParentComponent, LifecycleComponent]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(LifecycleParentComponent);
        component = fixture.componentInstance;
    })

    it('should have correct header', () => {
        const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
        expect(h3.textContent).toEqual('This is the lifecycle parent component')
    })

    it('should have name as Janitha', () => {
        const p: HTMLElement = fixture.nativeElement.querySelector('p');
        fixture.detectChanges()
        expect(p.textContent).toEqual(`Name : ${component.name}`)
    })

    it('should have name as given input', () => {
        component.name = "Lahiru"
        const p: HTMLElement = fixture.nativeElement.querySelector('p');
        fixture.detectChanges()
        expect(p.textContent).toEqual(`Name : Lahiru`)
    })

    it('should button click change name', () => {
        const p: HTMLElement = fixture.nativeElement.querySelector('p');
        const button: DebugElement = fixture.debugElement.query(By.css('button'));

        expect(button.nativeElement.textContent).toEqual('Change Name')
        button.triggerEventHandler('click', null);
        fixture.detectChanges()
        expect(p.textContent).toEqual(`Name : Vindya`)
    })
})