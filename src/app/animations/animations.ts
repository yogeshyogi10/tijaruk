import { from } from "rxjs"
import{trigger, state, style, transition,animate} from '@angular/animations';

export const fadeInUp = trigger('fadeInUp',[
    state('hidden',style({
        opacity:0,
        transform: 'translateY(30px)'
    })),
    state('visible',style({
        opacity:1,
        transform:'translate(0)'
    })),
    transition('hidden => visible',[
        animate('800ms ease-out')
    ])
]);

export const zoomIn = trigger('zoomIn',[
    state('hidden', style({
        opacity:0,
        transform: 'scale(1)'
    })),
    transition('hidden => visible',[
        animate('600ms ease-out')
    ])
]);

