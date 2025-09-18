import { Component, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ContactService } from '../../services/contact.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterLinkActive,FormsModule,CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
      email:string = '';

      constructor(private contactService: ContactService,private el:ElementRef,private whatsappService: WhatsappService) {}

        ngAfterViewInit() {
    // 👇 Observe when footer enters the viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.whatsappService.hideWhatsapp$.next(entry.isIntersecting);
      });
    }, { threshold: 0.5 });

    observer.observe(this.el.nativeElement); // observe footer itself
  }

    onSubmit() {
      const data = { email: this.email };
    this.contactService.submitForm(data,'footer').subscribe({
      next: (res) => {
        alert('Form Submitted successfully!');
        console.log(res)
      },
      error: (err) => {
        alert('Error submitting form.');
        console.error(err);
      }
    });
  }
}
