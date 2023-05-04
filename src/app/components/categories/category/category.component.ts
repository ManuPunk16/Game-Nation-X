import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { GamesService } from 'src/app/services/games.service';
import { Category, Games } from 'src/app/models/games.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  public games: Games[] = [];

  constructor (
    private _categoryService: CategoriesService,
    private _gamesService: GamesService,
    private _route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let name = params['name'];
      this._gamesService.getCategoriesByName(name).valueChanges().subscribe(cat => {
        this.games = cat;
        console.log(this.games);
      });
    });
  }
}
