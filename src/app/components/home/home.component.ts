import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('latestUpdates', { read: ElementRef }) latestUpdatesContainer!: ElementRef;
  @ViewChild('categories', { read: ElementRef }) categoriesContainer!: ElementRef;
  @ViewChild('platforms', { read: ElementRef }) platformsContainer!: ElementRef;
  @ViewChild('latestUploads', { read: ElementRef }) latestUploadsContainer!: ElementRef;

  isLatestUpdatesVisible = false;
  isCategoriesVisible = false;
  isPlatformsVisible = false;
  isLatestUploadsVisible = false;

  constructor() {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.observeVisibility(this.latestUpdatesContainer, () => {
      this.isLatestUpdatesVisible = true;
    });

    this.observeVisibility(this.categoriesContainer, () => {
      this.isCategoriesVisible = true;
    });

    this.observeVisibility(this.platformsContainer, () => {
      this.isPlatformsVisible = true;
    });

    this.observeVisibility(this.latestUploadsContainer, () => {
      this.isLatestUploadsVisible = true;
    });
  }

  private observeVisibility(container: ElementRef, callback: () => void): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(container.nativeElement);
  }
}
