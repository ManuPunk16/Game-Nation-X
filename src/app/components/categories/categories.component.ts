import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/games.model';
import { map, take } from 'rxjs';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit{

  public categories: Category[] = [];
  categoryCountMap = new Map<String, Number>();

  constructor (
    private _categoryService: CategoriesService,
    private _gamesService: GamesService
  ) {

  }

  ngOnInit(): void {
    this.getGamesWithCategoriesCount();
  }

  getGamesWithCategoriesCount() {
    this._categoryService.getAllCategories().snapshotChanges().pipe(
      take(1),
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.categories = data;
      // console.log(this.categories);
      this.categories.forEach( cat => {
        if (cat?.name) {
          this._gamesService.getCategoriesCountByName(cat.name).subscribe(data => {
            cat.total = data;
            this.categories.sort((a, b) => b.total - a.total).filter(cat => cat?.total <= 0);
          });
        }
      });
      // console.log(this.categories);
    });
  }
}
