import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Games } from 'src/app/models/games.model';
import { map } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-latest-uploads',
  templateUrl: './latest-uploads.component.html',
  styleUrls: ['./latest-uploads.component.css']
})
export class LatestUploadsComponent implements OnInit {

  gridColumns = 5;
  public games: Games[] = [];

  constructor (
    private _gamesService: GamesService,
    private meta: Meta,
    private title: Title
  ) {

  }

  ngOnInit(): void {
    this._gamesService.getAllGamesByLatestUpload().snapshotChanges().pipe(

      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.games = data;

      // this.games.slice(0, 15).forEach(game => {
      //   if (this.games) {

      //     const updatedAt = game.updatedAt;

      //     if (updatedAt instanceof Date) {
      //       const updatedAtFormatted = updatedAt.toISOString().split('T')[0];

      //       this.meta.addTags([
      //         { name: 'description', content: game.about }, //ajustar keywords
      //         { name: 'robots', content: 'index, follow' },
      //         { name: 'author', content: 'Luis Hernandez' },
      //         { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      //         { name: 'date', content: updatedAtFormatted, scheme: 'YYYY-MM-DD' },
      //         { charset: 'UTF-8' }
      //       ]);
      //     } else {
      //       this.meta.addTags([
      //         { name: 'description', content: game.about }, //ajustar keywords
      //         { name: 'robots', content: 'index, follow' },
      //         { name: 'author', content: 'Luis Hernandez' },
      //         { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      //         { charset: 'UTF-8' }
      //       ]);
      //     }

      //     this.title.setTitle(game.name);
      //   }
      // });
    });
  }
}
