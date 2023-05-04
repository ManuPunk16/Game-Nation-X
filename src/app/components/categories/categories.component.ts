import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/games.model';
import { map } from 'rxjs';
import { GamesService } from 'src/app/services/games.service';
import { Router } from '@angular/router';

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
    private _gamesService: GamesService,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this.getGamesWithCategoriesCount();
    // const name = "RPG";
    // this._gamesService.getCategoriesCountByName(name).subscribe(data => {
    //   console.log(data);
    // });
  }

  getGamesWithCategoriesCount() {
    this._categoryService.getAllCategories().snapshotChanges().pipe(
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
          });
        }
      });
      // console.log(this.categories);
    });
  }

  onClicked(item: any) {
    this._router.navigate(['category/', item.name]);
  }
}
