import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./pages/home/home";
import { Footer } from "./shared/footer/footer";
import { Navbar } from "./shared/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tijaruk-app');
}
