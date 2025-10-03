import {
  AfterViewInit,
  Component,
  ViewChild,
  ElementRef,
  NgZone,
  HostListener,
  OnInit,
  NgModule
} from '@angular/core';
import { RouterLink } from "@angular/router";
import { Navbar } from "../../shared/navbar/navbar";
import SplitType from 'split-type';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  imports: [Navbar, RouterLink,CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements AfterViewInit, OnInit {
  constructor(private el: ElementRef) {}

  @ViewChild('section1', { static: true }) section1!: ElementRef<HTMLElement>;
  @ViewChild('section2', { static: true }) section2!: ElementRef<HTMLElement>;
  @ViewChild('carousel', { static: false }) carouselRef!: ElementRef<HTMLDivElement>;
  @ViewChild('leftArrow', { static: false }) leftArrowRef!: ElementRef<HTMLDivElement>;
  @ViewChild('rightArrow', { static: false }) rightArrowRef!: ElementRef<HTMLDivElement>;
  @ViewChild('dotsContainer', { static: false }) dotsContainerRef!: ElementRef<HTMLDivElement>;

  values = [
    'Saudi-First \n Global Connection',
    'Innovation & \n Excellence',
    'Clarity & \n Transparency',
    'Growth with \n Real Support',
    'Trust & \n Reliability',
    'Sustainable \n Impact'
  ];

  currentIndex = 0;
  visibleCards = 1;
  cardWidth = 270;
  offset = 0;
  activeDot = 0;
  dots: number[] = [];

  ngOnInit() {
    this.updateVisibleCards();
    this.updateDots();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            } else {
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

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleCards();
    this.updateDots();
    this.updateCarousel();
  }

  updateVisibleCards() {
    const width = window.innerWidth;
    if (width <= 600) this.visibleCards = 1;
    else if (width <= 1024) this.visibleCards = 2;
    else this.visibleCards = 4;
  }

  updateDots() {
    const totalDots = Math.ceil(this.values.length / this.visibleCards);
    this.dots = Array(totalDots).fill(0);
  }

  updateCarousel() {
    this.offset = -(this.currentIndex * this.cardWidth);
    this.activeDot = Math.floor(this.currentIndex / this.visibleCards);
  }

  nextSlide() {
    if (this.currentIndex < this.values.length - this.visibleCards) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  goToSlide(dotIndex: number) {
    this.currentIndex = dotIndex * this.visibleCards;
    this.updateCarousel();
  }
}
