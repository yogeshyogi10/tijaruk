import { AfterViewInit, Component, ElementRef, NgZone } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Navbar } from "../../shared/navbar/navbar";
import { NgForOf } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/all';

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-service',
  imports: [Navbar],
  templateUrl: './service.html',
  styleUrl: './service.css'
})
export class Service implements AfterViewInit{

   private observer!: IntersectionObserver;

    services = [
    { name: 'Import & Export', description: 'TIJARUK is your trusted sourcing and trade partner. We help Saudi-based businesses source and import products from Asia, Africa, and around the globe, while also exporting Saudi-made products to international markets.' },
    { name: 'Business Setup & Global Trade Support', description: 'For Saudi citizens and foreign entrepreneurs, TIJARUK makes it easy to start and expand your business in Saudi Arabia. We simplify legal setup and connect you to our global trade ecosystem' },
    { name: 'Entrepreneur Development Support', description: 'For aspiring Saudi entrepreneurs, we provide training, mentorship, and end-to-end support to launch and grow successful businesses.' },
    { name: 'Branding & Marketing Make Your Brand Stand Out', description: 'Branding is about more than logos; it’s about trust, perception, and positioning. TIJARUK builds your brand identity and ensures it shines in both local and global markets.' },
    { name: 'Business Automation Solutions – Work Smarter, Not Harder', description: 'TIJARUK helps businesses save time, reduce manual work, and scale efficiently with digital systems.' },
    { name: 'Saudi Market Entry Support Get Your Products Seen & Sold', description: 'If you’re looking to enter the Saudi market, TIJARUK is your trusted local partner. We manage everything from import and clearance to sales channels and ongoing support.' }
  ];

constructor(private el: ElementRef,private route: ActivatedRoute, private ngZone: NgZone) {}

ngOnInit() {
  this.route.url.subscribe(urlSegments => {
    const section = urlSegments[1]?.path; 
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}

  ngAfterViewInit(): void {

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



    openWhatsApp(serviceName: string,servicedescription: string) {
    const phone = "919944163807";
    const message = `Hello, I would like to schedule a consultation for your *${serviceName}* service.\n\nService Details: ${servicedescription}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
 
    }
  }


