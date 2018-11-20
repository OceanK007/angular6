import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      // transition('normal => highlighted', animate(300)),
      // transition('highlighted => normal', animate(800)),

      // If you want same animation timing for both directions, use <=>:
      transition('normal <=> highlighted', animate(300)),
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      // * means: for any state
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        //animate(5000)    // This is not working
      ]),   
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ]),
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([ // Keyframes are used for time-slice: We use "offset" for it
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0 // offset is time frames
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3 // At 300 milliseconds
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8 // At 800 milliseconds
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1 // At 1000 milliseconds
          }),
        ]))
      ]),
      transition('* => void', [
        // Group is used to perform animation simultaneously
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          })),
        ])
      ]),
    ]),
  ]
})
export class AppComponent {
  animateIt = 'normal';
  animateItWild = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

    onAdd(item) {
      this.list.push(item);
    }

    onDelete(item) {
      this.list.splice(this.list.indexOf(item), 1);
    }

    onAnimate() {
      this.animateIt == 'normal' ? this.animateIt = 'highlighted' : this.animateIt = 'normal';
      this.animateItWild == 'normal' ? this.animateItWild = 'highlighted' : this.animateItWild = 'normal';
    }

    onShrink() {
      this.animateItWild = 'shrunken'
    }

    animationStarted(event) {
      console.log(event);
    }

    
    animationEnded(event) {
      console.log(event);
    }
}
