import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Games } from 'src/app/models/games.model';
import { map } from 'rxjs';
import { Router } from '@angular/router';

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
    private _router: Router
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
    });
  }

  onClicked(game: any) {
    this._router.navigate(['game-datails/', game.id]);
  }

}
