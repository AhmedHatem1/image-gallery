import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent {
  currentImageIndex: number;
  isDownloadLoading:boolean = false
  disableNextButton: boolean = false;
  disablePrevButton: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ImageModalComponent>
  ) {
    this.currentImageIndex = data.currentIndex;
  }

  ngOnInit() {
      this.disablePrevButton = this.currentImageIndex == 0;
      this.disableNextButton = this.currentImageIndex == this.data.images.length - 1;
  }

  get currentImage() {
    return this.data.images[this.currentImageIndex];
  }

  nextImage() {
    if (this.currentImageIndex < this.data.images.length - 1) {
      this.currentImageIndex++;
    }
    this.disableNextButton = this.currentImageIndex == this.data.images.length - 1;
    this.disablePrevButton = this.currentImageIndex == 0;

  }
  
  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
    this.disableNextButton = this.currentImageIndex == this.data.images.length - 1;
    this.disablePrevButton = this.currentImageIndex == 0;

  }
  downloadImage() {
    const imageUrl = this.currentImage.url;
    const fileName = this.currentImage.title;
    this.isDownloadLoading = true;
    fetch(imageUrl).then((response) => response.blob()).then((blob) => {
        this.isDownloadLoading = false;
        saveAs(blob, `${fileName}.jpg`);
      })
      .catch((error) => {
        this.isDownloadLoading = false;
        console.error('Error downloading image:', error);
      });
  }
  
  close() {
    this.dialogRef.close();
  }
  
}
