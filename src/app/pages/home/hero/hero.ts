import { Component } from '@angular/core';
import { WhatsappService } from '../../../services/whatsapp.service';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, Navbar],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {

  hideWhatsapp =false;

openWhatsApp() {
  const phoneNumber = '919944163807';  
  const message = 'Hello! I would like to know more about your services.';  
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

}
