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

       this.ngZone.runOutsideAngular(() => {
      this.initAnimations();
    });
  }

 initAnimations(): void {
  // ✅ Section 1 (Hero)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-1',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  tl.from('.section-1 h1 span', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out"
  })
  .from('.section-1 p', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.5");


 function createOddServiceAnimation(sectionId: string) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionId,
      start: 'top 90%',
      end: 'bottom 50%',
      scrub:1,
      toggleActions: 'play none none reverse'
    }
  });

  // Animate text content inside col-1 (heading, p, li, button)
  tl.from(`${sectionId} .col-1 > *`, {
    x: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2
  });

  // Animate image from right
  tl.from(`${sectionId} .col-2 img`, {
    x: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
  }, "-=1.0");
}

  // ✅ Function for even services (2,4,6)
 function createEvenServiceAnimation(sectionId: string) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionId,
      start: 'top 90%',
      end: 'bottom 50%',
      scrub:1,
      toggleActions: 'play none none reverse'
    }
  });

  // Animate text content inside col-1 (heading, p, li, button)
  tl.from(`${sectionId} .col-1 > *`, {
    x: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2   // <-- makes points appear one by one
  });

  // Animate image from left
  tl.from(`${sectionId} .col-2 img`, {
    x: -80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
  }, "-=1.0");
}
gsap.registerPlugin(ScrollTrigger);

const service5 = document.querySelector(".service-5");

if (service5) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: service5,
      start: "top 90%", // when section enters viewport
      end: "bottom 90%",
      scrub:1,
      toggleActions: "play none none reverse"
    }
  });

  // Heading from left
  tl.from(".service-5 h1", {
    x: -120,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Image from right
  tl.from(".service-5 .img-1-1", {
    x: 120,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.8"); // overlap with heading

  // Paragraph + points from left
  tl.from(".service-5 .col-2-1 p, .service-5 .col-2-1 .info-1-1, .service-5 .col-2-1 .info-2-1, .service-5 .col-2-1 .info-3-1, .service-5 .col-2-1 .info-4-1, .service-5 .col-2-1 .info-5-1", {
    x: -80,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.5");

  // Button from right
  tl.from(".service-5 .btn-1", {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.3");
}



  // Apply animations
  createOddServiceAnimation("#import-export");    // Service 1
  createEvenServiceAnimation("#business-setup");  // Service 2
  createOddServiceAnimation("#entrepreneur");     // Service 3
  createEvenServiceAnimation("#branding");        // Service 4
  
  createOddServiceAnimation("#global-marketing");// Service 6


    }


    openWhatsApp(serviceName: string,servicedescription: string) {
    const phone = "919944163807";
    const message = `Hello, I would like to schedule a consultation for your *${serviceName}* service.\n\nService Details: ${servicedescription}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

      
    }
  
  }


