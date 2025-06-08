import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelFeaturesService } from '../../core/services/hotel-features/hotel-features.service';
import { Feature } from '../../shared/models/feature';

@Component({
  selector: 'app-feature-details',
  standalone: true,
  imports: [],
  templateUrl: './feature-details.component.html',
  styleUrl: './feature-details.component.scss'
})
export class FeatureDetailsComponent {
  apiUrl = 'http://localhost:8080/';
  feature: Feature | null = null;

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
  }
}
