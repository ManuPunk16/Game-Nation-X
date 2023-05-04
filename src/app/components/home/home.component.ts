import { Component, OnInit } from '@angular/core';
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

  title = 'game-nation-x';
  gridColumns = 5;
  public games: Games[] = [];

  constructor(
    private _gamesService: GamesService,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this._gamesService.getAllGames().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.games = data;
      console.log(this.games);
    });
  }

  onClicked(game: any) {
    this._router.navigate(['game-datails/', game.id]);
  }
}
