import { AfterViewInit, Component, ViewChild,ElementRef, NgZone} from '@angular/core';
import { RouterLinkActive } from "@angular/router";
import { Navbar } from "../../shared/navbar/navbar";
import { RouterLink } from "@angular/router";
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

@Component({
  selector: 'app-about',
  imports: [Navbar, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements AfterViewInit{

  @ViewChild('section1', { static: true }) section1!: ElementRef<HTMLElement>;
  @ViewChild('section2', { static: true }) section2!: ElementRef<HTMLElement>;
  @ViewChild('carousel', { static: true }) carousel!: ElementRef<HTMLElement>;
constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngAfterViewInit(): void {

     const carouselEl = this.carousel.nativeElement;
    const cards = Array.from(carouselEl.querySelectorAll('.value-card')) as HTMLElement[];

    // Duplicate for infinite loop illusion
    carouselEl.innerHTML += carouselEl.innerHTML;
    const allCards = Array.from(carouselEl.querySelectorAll('.value-card')) as HTMLElement[];

    this.ngZone.runOutsideAngular(() => {
     

     /* // Function to scale based on distance from center
      const applyScaling = () => {
        const rect = carouselEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;

        allCards.forEach(card => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(centerX - cardCenter);

          const scale = gsap.utils.mapRange(0, rect.width / 2, 1.2, 0.8, distance);
          gsap.to(card, { scale, duration: 0.3, overwrite: true });
        });
      };

          applyScaling();*/

      // Arrow buttons
      const leftBtn = document.querySelector('.arrow.left') as HTMLElement;
      const rightBtn = document.querySelector('.arrow.right') as HTMLElement;

      const moveBy = 150; // how much to slide per click

      leftBtn?.addEventListener('click', () => {
        gsap.to(carouselEl, {
          x: `-=${moveBy}`,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      rightBtn?.addEventListener('click', () => {
        gsap.to(carouselEl, {
          x: `+=${moveBy}`,
          duration: 0.8,
          ease: "power2.out",
        });
        
      });
    });
  
  
  setTimeout(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            // Remove class when out of view so it replays on scroll back
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -20px 0px" }
    );

    const elements = this.el.nativeElement.querySelectorAll(
      '.fade-in, .fade-up, .reveal, .reveal-left, .reveal-right'
    );

    console.log("Found elements:", elements.length);

    elements.forEach((el: Element, index: number) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.03}s`; 
      observer.observe(el);
    });
  }, 0);
}
   
}


  



  























































































   /* const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
  
          const elements = entry.target.querySelectorAll('.fade-up');
          if (entry.isIntersecting) {
          elements.forEach((el: Element, index: number) => {
            setTimeout(() => {
              el.classList.add('show');
            }, index * 200);
          });
        } else{
              elements.forEach((el:Element) => {
                el.classList.remove('show');
              });
            } // stagger: 200ms delay
          });
    }, { threshold: 0.6 });

    // observe section containers
    const sections = this.el.nativeElement.querySelectorAll('.section-1,.section-2, .section-3, .section-4, .section-5, .section-6');
    sections.forEach((section: Element) => observer.observe(section));

    const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const elements = entry.target.querySelectorAll('.slide-left, .slide-right');
      if (entry.isIntersecting) {
        elements.forEach((el: Element, index: number) => {
          setTimeout(() => {
            el.classList.add('show');
          }, index * 200);
        });
      } else {
        elements.forEach((el: Element) => el.classList.remove('show'));
      }
    });
  }, { threshold: 0.4 });

  const slideSections = this.el.nativeElement.querySelectorAll('.section-2,.section-3,.section-4,.section-5');
  slideSections.forEach((section: Element) => observer2.observe(section));*/




