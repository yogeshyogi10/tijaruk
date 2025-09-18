import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.html',
  styleUrls: ['./map-container.css']   // ✅ plural
})
export class MapContainer implements OnInit {
  private map!: L.Map;
  private centroid: L.LatLngExpression = [42.3601, -71.0659]; // Example: Boston

  ngOnInit(): void {
    this.initMap(); // ✅ call initialization
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map); // ✅ correct lowercase

    // Add some sample markers around centroid
    Array(5).fill(this.centroid).map(
      x => [ (x as [number, number])[0] + (Math.random() - 0.5) / 10,
             (x as [number, number])[1] + (Math.random() - 0.5) / 10 ]
    ).map(
      coords => L.marker(coords as L.LatLngExpression)
    ).forEach(
      marker => marker.addTo(this.map)
    );
  }
}
