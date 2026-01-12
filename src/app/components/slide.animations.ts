import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations';

export const slideAnimations = trigger('screenAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ], { optional: true }),

        group([
          query(':leave', [
            animate('500ms ease', style({ opacity: 0 }))
          ], { optional: true }),

          query(':enter', [
            style({ opacity: 0 }),
            animate('500ms ease', style({ opacity: 1 }))
          ], { optional: true })
        ])
      ])
    ])
  