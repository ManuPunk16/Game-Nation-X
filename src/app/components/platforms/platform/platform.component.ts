import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Platform, Games } from 'src/app/models/games.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';


@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit{

  public games: Games[] = [];
  public title: string = 'Plataforma seleccionada: ';
  public pubTitle!: string;
  gridColumns = 5;

  constructor (
    private _gamesService: GamesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let name = params['name'];
      this.pubTitle = this.title + name;
      this._gamesService.getPlatformsByName(name).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() }
            )
          )
        )
      ).subscribe(cat => {
        this.games = cat;
      });
    });
  }

  onClicked(game: any) {
    this._router.navigate(['game-datails/', game.id]);
  }
}
