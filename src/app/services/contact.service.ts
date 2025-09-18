import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ContactService {
  private apiURL = 'https://blue-star-4b52.vikivignesh0014.workers.dev/';

  constructor(private http: HttpClient) {}

  submitForm(formData: any, page: 'home' | 'contact' | 'newsletter' | 'footer'):Observable<any> {
    const payload = { ...formData,page};
    return this.http.post(this.apiURL, payload, { responseType: 'json' });
  }
}