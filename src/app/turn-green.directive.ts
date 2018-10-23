import { Directive, OnInit, HostListener, HostBinding, Input } from "@angular/core";

@Directive({
    selector: '[appTurnGreen]'
})
export class TurnGreenDirective implements OnInit
{
    @Input() defaultColor: string = 'transparent';
    @Input('appTurnGreen') highlightColor: string = 'blue';
    @HostBinding('style.backgroundColor') bgColor: string;

    constructor() { }

    ngOnInit() {
        this.bgColor = this.defaultColor;
    }

    // method name can be anything
    @HostListener('mouseenter') 
    mouseEnter(eventData: Event) {
        this.bgColor = this.highlightColor;
    }   

    @HostListener('mouseleave') 
    mouseLeave(eventData: Event) {
        this.bgColor = this.defaultColor;
    }   
}