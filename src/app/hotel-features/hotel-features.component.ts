import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HotelFeaturesService } from '../core/services/hotel-features/hotel-features.service';
import { Feature } from '../shared/models/feature';

@Component({
  selector: 'app-hotel-features',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './hotel-features.component.html',
  styleUrl: './hotel-features.component.scss'
})
export class HotelFeaturesComponent {
  apiUrl = 'http://localhost:8080/';
  features: Feature[] = [];

  constructor(
    private featuresService: HotelFeaturesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.featuresService.getAllFeatures().subscribe({
      next: (res) => {
        this.features = res;
        console.log('Features loaded:', res);
      },
      error: (error) => {
        console.error('Error loading features:', error);
      }
    });
  }

  goToDetailsFeature(id: number) {
    console.log('Navigating to details feature');
    this.router.navigate(['/features', id]);
  }

}
