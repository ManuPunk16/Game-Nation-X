import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Classification, Games } from 'src/app/models/games.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  public games?: Games;
  public esrb = '';
  fxFlex = { xs: false };

  constructor (
    private _gameService: GamesService,
    private _route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._gameService.getGameById(id).valueChanges().subscribe(game => {
        this.games = game;
        // console.log(this.games);

        const matchingClassification = Classification.classification.find((c) => c.title === this.games?.classification);
        if (matchingClassification) {
          this.esrb = matchingClassification.image;
        }
      });
    });
  }

}
