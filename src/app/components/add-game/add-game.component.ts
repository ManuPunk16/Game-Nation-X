import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { GamesService } from '../../services/games.service';
import { Games, Category } from '../../models/games.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  public games: Games = new Games();
  public categories: Category[] = [];
  submitted = false;

  constructor(
    private _gamesService: GamesService,
    private _categoryService: CategoriesService
  ) {

  }

  ngOnInit(): void {
    this._categoryService.getAllCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  saveGame(): void {
    this.games.createdAt = moment().toDate();
    this.games.updatedAt = moment().toDate();
    this._gamesService.createGame(this.games).then(() => {
      console.log(this.games);
      this.submitted = true;
    });
  }

  newGame(): void {
    this.submitted = false;
    this.games = new Games();
  }

}
