import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicedetail',
  imports: [],
  templateUrl: './servicedetail.html',
  styleUrl: './servicedetail.css'
})
export class Servicedetail {
  serviceId: string = '';
  serviceData: any;

  
  services: any = {
    'import-export': {
      title: 'Import & Export Solutions',
      description: 'We provide end-to-end import and export services...',
      image: 'assets/images/import-export.jpg'
    }
  };
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.serviceId = params['id'];
      this.serviceData = this.services[this.serviceId]; // e.g. "import-export"
    });
  }
}

