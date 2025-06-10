import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelFeaturesService } from '../../core/services/hotel-features/hotel-features.service';
import { Feature } from '../../shared/models/feature';
import { FacilityGallery } from '../../shared/models/facilityGallery';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './feature-details.component.html',
  styleUrl: './feature-details.component.scss'
})
export class FeatureDetailsComponent {
  apiUrl = 'http://localhost:8080/';
  feature: Feature | null = null;
  featureGallery: FacilityGallery[] = [];
  zoomedImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private featuresService: HotelFeaturesService
  ) { }

  ngOnInit() {
    const featureId = this.route.snapshot.paramMap.get('id');

    this.featuresService.getFeatureById(featureId).subscribe({
      next: (res) => {
        this.feature = res;
        console.log('Feature details loaded:', res);
      },
      error: (error) => {
        console.error('Error loading feature details:', error);
      }
    });

    this.featuresService.getFeatureGallery(featureId).subscribe({
      next: (res) => {
        this.featureGallery = res;
        console.log('Feature gallery loaded:', res);
      },
      error: (error) => {
        console.error('Error loading feature gallery:', error);
      }
    });
  }

  openModal(imageUrl: string) {
    this.zoomedImage = imageUrl;
  }

  closeModal() {
    this.zoomedImage = null;
  }
}
