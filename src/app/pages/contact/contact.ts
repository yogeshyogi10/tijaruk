import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Navbar } from "../../shared/navbar/navbar";
import { ContactService } from '../../services/contact.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-contact',
  imports: [Navbar, FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements AfterViewInit {
  formData: any = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  newsletterEmail: string = '';
  private map!: L.Map;
  private markers: L.Marker[] = [];
  searchQuery: string = '';
  suggestions: any[] = [];
  places: Array<{ name: string, display_name: string, lat: number, lon: number }> = [];
  private searchTimer: any = null;

  constructor(private el: ElementRef, private contactService: ContactService) {}

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

    this.initMap();
  }

  private initMap(): void {
    const DefaultIcon = L.icon({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    this.map = L.map('map', {
      center: [24.7136, 46.6753],
      zoom: 10
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap & CARTO contributors',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(this.map);

    L.marker([24.7136, 46.6753]).addTo(this.map)
      .bindPopup('TIJARUK Office - Riyadh')
      .openPopup();

    setTimeout(() => { this.map.invalidateSize(); }, 0);
  }

  onSearchChange(): void {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    if (this.searchQuery.length < 3) {
      this.suggestions = [];
      return;
    }
    this.searchTimer = setTimeout(() => {
      this.fetchSuggestions(this.searchQuery);
    }, 300);
  }

  private fetchSuggestions(query: string): void {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`;

    fetch(url)
      .then(async res => {
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType?.includes("application/json")) {
          return res.json();
        } else {
          const text = await res.text();
          throw new Error(`Invalid response: ${text}`);
        }
      })
      .then((data: any[]) => {
        this.suggestions = data || [];
      })
      .catch(err => {
        console.error("Nominatim fetch error:", err);
        alert("Failed to fetch location suggestions.");
      });
  }

  selectPlace(place: any): void {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);

    this.map.setView([lat, lon], 14);

    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];

    L.marker([lat, lon]).addTo(this.map)
      .bindPopup(place.display_name)
      .openPopup();

    this.places.push({
      name: place.display_name.split(',')[0],
      display_name: place.display_name,
      lat,
      lon
    });

    this.searchQuery = '';
    this.suggestions = [];
  }

  exportToGoogleSheet(): void {
    if (!this.places.length) {
      alert("No places to export");
      return;
    }

    const webAppUrl = "https://spring-dust-a777.vikivignesh0014.workers.dev/";

    fetch(webAppUrl, {
      method: "POST",
      body: JSON.stringify(this.places),
      headers: { "Content-Type": "application/json" }
    })
      .then(async res => {
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType?.includes("application/json")) {
          const result = await res.json();
          console.log("Exported to Google Sheet:", result);
          alert("Places exported successfully!");
          this.places = [];
        } else {
          const text = await res.text();
          throw new Error(`Unexpected response: ${text}`);
        }
      })
      .catch(err => {
        console.error("Export failed:", err);
        alert("Failed to export to Google Sheets.");
      });
  }

  onSubmit() {
    this.contactService.submitForm(this.formData, 'footer').subscribe({
      next: (res) => {
        alert('Form Submitted successfully!');
        console.log(res);
      },
      error: (err) => {
        alert('Error submitting form.');
        console.error(err);
      }
    });
  }

  Subscribe() {
    const data = { email: this.newsletterEmail };
    this.contactService.submitForm(data, 'newsletter').subscribe({
      next: (res) => {
        alert('Subscribed successfully!');
        this.newsletterEmail = '';
        console.log(res);
      },
      error: (err) => {
        alert('Error subscribing.');
        console.error(err);
      }
    });
  }
}
