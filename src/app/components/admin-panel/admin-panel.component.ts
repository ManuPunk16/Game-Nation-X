import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GamesService } from '../../services/games.service';
import { Games, Category, Platform } from '../../models/games.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { PlatformsService } from 'src/app/services/platforms.service';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public games: Games[] = [];
  public dataSourceGames!: MatTableDataSource<Games>;
  public displayeColumnGames: string[] = ['actions', 'published', 'name', 'createdAt', 'updatedAt'];

  constructor (
    private _gamesService: GamesService,
    private _categoryService: CategoriesService,
    private _platformService: PlatformsService,
    public _dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames() {
    this._gamesService.getAllGames().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      map(data =>
        data.filter(item => item.createdAt) // filtrar los documentos que tienen createdAt definido
            .sort((a, b) => (b.createdAt as unknown as number) - (a.createdAt as unknown as number)) // ordenar por createdAt en orden descendente
      )
    ).subscribe(data => {
      this.games = data;
      this.dataSourceGames = new MatTableDataSource(this.games);
    });
  }

  updatePublished(item: any, event: any): void {
    // console.log(`El valor del toggle es ${event.checked}`, row.id);
    if (item.id) {
      this._gamesService.updateGame(item.id, { published: event.checked })
      .then(() => {
        this.games = event.checked;
      })
      .catch(err => console.log(err));
    }
  }

}
