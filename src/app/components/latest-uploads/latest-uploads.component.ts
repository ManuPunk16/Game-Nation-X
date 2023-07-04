import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Games } from 'src/app/models/games.model';
import { map } from 'rxjs';
import { Meta } from '@angular/platform-browser';

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
    private meta: Meta
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

      this.games.slice(0, 15).forEach(game => {
        this.meta.addTags([
          { name: 'description', content: game.about },
          { property: 'og:title', content: game.name }
        ]);
      });
    });
  }
}
