import { UtilitiesService } from './../utilities.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { Image } from '../models/image.model';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent {
  categories:string[] = ['All', 'Nature', 'Animals', 'Architecture'];
  selectedCategory:string = 'All';
  images: Image[] = [];
  filteredImages: Image[] = [];

  constructor(private utilitiesService:UtilitiesService, private dialog: MatDialog) {}

  ngOnInit(){
    this.images = this.utilitiesService.generateFakeImages();
    this.filteredImages = [...this.images];
  }

  filterImages() {
    if (this.selectedCategory === 'All') {
      this.filteredImages = [...this.images];
    } else {
      this.filteredImages = this.images.filter(
        (img) => img.category === this.selectedCategory
      );
    }
  }

  openImage(image:any) {
    const currentIndex = this.images.indexOf(image);
  
    this.dialog.open(ImageModalComponent, {
      data: { images: this.images, currentIndex: currentIndex },
    });
  }
}
