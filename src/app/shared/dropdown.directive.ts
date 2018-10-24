import { Directive, HostBinding, HostListener, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.show') isShow = false;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    @HostListener('click') toggleOpen()
    {
        this.isShow = !this.isShow;
        const childFirst = this.elementRef.nativeElement.childNodes[0];
        const childSecond = this.elementRef.nativeElement.childNodes[1];
        //console.log(childFirst);
        //console.log(childSecond);
        if(this.isShow)
        {
            this.renderer.setAttribute(childFirst, 'aria-expanded', 'true');
            this.renderer.addClass(childSecond, 'show');
        }
        else
        {
            this.renderer.setAttribute(childFirst, 'aria-expanded', 'false');
            this.renderer.removeClass(childSecond, 'show');
        }
    }
}