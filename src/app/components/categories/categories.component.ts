import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/games.model';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit{

  public _categories = Categories.categories;

  constructor (
    private _gamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.getGamesWithCategoriesCount();
  }

  getGamesWithCategoriesCount() {
    const categories = Categories.categories;
    categories.forEach(category => {
      this._gamesService.getCategoriesCountByName(category.cat)
        .subscribe(count => {
          category.total = count;
          this._categories.sort((a, b) => b.total - a.total).filter(cat => cat.total <= 0);
        });
    });
  }
}
