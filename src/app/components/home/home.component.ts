import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Games } from 'src/app/models/games.model';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GamesService]
})
export class HomeComponent implements OnInit {
  @ViewChild('latestUpdates', { read: ElementRef }) latestUpdatesContainer!: ElementRef;
  @ViewChild('categories', { read: ElementRef }) categoriesContainer!: ElementRef;
  @ViewChild('platforms', { read: ElementRef }) platformsContainer!: ElementRef;
  @ViewChild('latestUploads', { read: ElementRef }) latestUploadsContainer!: ElementRef;

  gridColumns = 5;
  public games: Games[] = [];
  isLatestUpdatesVisible = false;
  isCategoriesVisible = false;
  isPlatformsVisible = false;
  isLatestUploadsVisible = false;

  constructor(
    private _gamesService: GamesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._gamesService.getAllGames().snapshotChanges().pipe(

      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.games = data;
    });
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

  onClicked(game: any) {
    this._router.navigate(['game-datails/', game.id]);
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
