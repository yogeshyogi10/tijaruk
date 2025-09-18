import { AfterViewInit, Component, ElementRef,NgZone, Renderer2} from '@angular/core';
import { Navbar } from "../../shared/navbar/navbar";
import { ContactService } from '../../services/contact.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';
import { WhatsappService } from '../../services/whatsapp.service';
import { Router,NavigationEnd } from '@angular/router';
import { gsap } from "gsap";
import SplitType from 'split-type'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)



@Component({
  selector: 'app-home',
  imports: [Navbar, FormsModule, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit{
  

  formData: any ={
  name: '',
  email: '',
  phone: '',
  subject:'',
  message: ''
};

  testimonials = [
    {
      stars: '★★★★★☆',
      rating: '4.5',
      text: 'I can’t thank Tijaruk enough! From the moment they showed up for the free inspection, I felt like I was in good hands...',
      image: '/assets/images/Ellipse-13.png',
      name: 'Michelle John',
      role: 'Happy Customer'
    },
    {
      stars: '★★★★☆',
      rating: '4.0',
      text: 'Amazing experience, professional team, quick delivery...jdhuehfwehfuewcjds',
      image: '/assets/images/Ellipse-13.png',
      name: 'David Wilson',
      role: 'Business Owner'
    },
    {
      stars: '★★★★★',
      rating: '5.0',
      text: 'They exceeded my expectations, highly recommended! rywfwcjwncwjfifwf ',
      image: '/assets/images/Ellipse-13.png',
      name: 'Sara Lee',
      role: 'Entrepreneur'
    }
  ];

    current = 0;

getPreviousIndex(): number {
  return (this.current - 1 + this.testimonials.length) % this.testimonials.length;
}

getNextIndex(): number {
  return (this.current + 1) % this.testimonials.length;
}

nextTestimonial(): void {
  this.current = this.getNextIndex();
}

prevTestimonial(): void {
  this.current = this.getPreviousIndex();
}



hideWhatsapp =false;

openWhatsApp() {
  const phoneNumber = '919944163807';  
  const message = 'Hello! I would like to know more about your services.';  
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

onSubmit() {
  this.contactService.submitForm(this.formData,'home').subscribe({
    next: (res) => {
      alert('Form Submitted successfully!');
    },
    error: (err) => {
      alert('Error submitting form.');
      console.error(err);
    }
  });
}
  constructor(private el: ElementRef, private contactService: ContactService,private whatsappService:WhatsappService,private renderer:Renderer2,private router: Router,private ngZone: NgZone) {}

   ngOnInit() {
    this.whatsappService.hideWhatsapp$.subscribe(flag => {
      this.hideWhatsapp = flag;
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
}






