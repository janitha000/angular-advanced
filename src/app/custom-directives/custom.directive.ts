import { Directive, ElementRef, Input, OnInit, Component, ViewContainerRef, TemplateRef, HostListener } from '@angular/core';

//Attribute directive
//Add class to the element
@Directive({ selector: '[ttclass]' })
export class TTClassDirective implements OnInit {
    @Input() ttclass!: string;

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        this.el.nativeElement.classList.add(this.ttclass)
    }
}

//Structural directive
//show only if condition is false
@Directive({ selector: '[unless]' })
export class UnlessDirective {
    _unless: boolean = false;

    constructor(private _viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) { }

    @Input()
    set unless(condition: boolean) {
        this._unless = condition;
        this._updateView()
    }

    _updateView() {
        if (this._unless) {
            this._viewContainer.clear()
        } else {
            this._viewContainer.createEmbeddedView(this.templateRef)
        }
    }
}


@Component({
    selector: 'custom-directive',
    template: `<button [ttclass]=blue>Click</button>
    <button *unless=false>Show</button>`,
    styles: ['.blue { background-color: blue; }']
})

export class CustomDirectivesComponent implements OnInit {
    blue: string = 'blue';
    constructor() { }

    ngOnInit() { }
}


//Attibute directive
//toggle class on mouse click
@Directive({
    selector: '[ttToggle]',
})
export class ttToggleDirective {

    private elementSelected = false;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
    }

    @HostListener('click')
    private onClick() {
        this.elementSelected = !this.elementSelected;
        if (this.elementSelected) {
            this.el.nativeElement.classList.add('toggle')
        } else {
            this.el.nativeElement.classList.remove('toggle')
        }
    }

}