import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { GamesService } from 'src/app/services/games.service';
import { Category, Games } from 'src/app/models/games.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  public games: Games[] = [];
  public title: string = 'Categoria seleccionada: ';
  public pubTitle!: string;
  gridColumns = 5;

  constructor (
    private _categoryService: CategoriesService,
    private _gamesService: GamesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let name = params['name'];
      this.pubTitle = this.title + name;
      this._gamesService.getCategoriesByName(name).snapshotChanges().pipe(
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
