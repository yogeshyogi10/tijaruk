import { Component, NgZone, Input, HostListener,ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
 lastScrollTop = 0;
  isHidden = false;
  firstSectionTop = 0;

  constructor(private el: ElementRef,private router: Router, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // get top offset of first section
    const firstSection = document.querySelector('.section-1') as HTMLElement;
    if (firstSection) {
      this.firstSectionTop = firstSection.offsetTop;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // ✅ Hide navbar when scrolling down
    if (currentScroll > this.lastScrollTop) {
      this.isHidden = true;
    }

    // ✅ Show only when back to first section
    if (currentScroll <= this.firstSectionTop + 50) {
      this.isHidden = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }


 menuActive = false;

toggleMenu() {
  this.menuActive = !this.menuActive;


    // run once
    this.initMagicLine();

    // run again every time route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngZone.onStable.subscribe(() => {
          this.initMagicLine();
        });
      }
    });
  }

  private initMagicLine(): void {
    const nav = document.querySelector('.navb .navbar ul') as HTMLElement;
    const links = nav?.querySelectorAll('li a');
    const magicLine = document.querySelector('.magic-line') as HTMLElement;

    if (!nav || !links || !magicLine) return;

    const active = nav.querySelector('a.active') as HTMLElement;
    if (active) {
      magicLine.style.width = `${active.offsetWidth}px`;
      magicLine.style.left = `${active.offsetLeft}px`;
    }

    links.forEach(link => {
      link.addEventListener('mouseenter', e => {
        const target = e.target as HTMLElement;
        const linkLeft = target.offsetLeft;
        const linkWidth = target.offsetWidth;

        const currentLeft = parseInt(magicLine.style.left || '0', 10);
        const currentWidth = parseInt(magicLine.style.width || '0', 10);

        if (linkLeft > currentLeft) {
          // moving right → extend first, then shrink
          magicLine.style.width = `${(linkLeft - currentLeft) + linkWidth}px`;
          setTimeout(() => {
            magicLine.style.left = `${linkLeft}px`;
            magicLine.style.width = `${linkWidth}px`;
          }, 300);
        } else {
          // moving left → shift first, then extend
          magicLine.style.left = `${linkLeft}px`;
          magicLine.style.width = `${(currentLeft - linkLeft) + linkWidth}px`;
          setTimeout(() => {
            magicLine.style.width = `${linkWidth}px`;
          }, 300);
        }
      });
    });

    nav.addEventListener('mouseleave', () => {
      if (active) {
        magicLine.style.width = `${active.offsetWidth}px`;
        magicLine.style.left = `${active.offsetLeft}px`;
      } else {
        magicLine.style.width = '0';
      }
    });
  }

    openWhatsapp() {
  window.open(
    "https://wa.me/91994163807?text=Hello%20I%20want%20to%20know%20more",
    "_blank"
  );
}

}
