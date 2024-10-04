import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker'
import { Image } from './models/image.model';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  
  constructor() { }

  generateFakeImages() {
    const images:Image[] = [];
    for (let i = 0; i < 50; i++) {
      const category = faker.helpers.arrayElement(['Nature', 'Animals', 'Architecture']);
      images.push({
        url: faker.image.urlLoremFlickr({ category: category }),
        title: faker.lorem.words(2),
        category: category
      });
    }
    return images
  }
}
