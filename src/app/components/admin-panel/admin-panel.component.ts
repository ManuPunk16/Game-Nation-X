import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GamesService } from '../../services/games.service';
import { Games, Category, Platform } from '../../models/games.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { PlatformsService } from 'src/app/services/platforms.service';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../add-game/create-category/create-category.component';
import { EditCategoryComponent } from '../add-game/edit-category/edit-category.component';
import { CreatePlatformComponent } from '../add-game/create-platform/create-platform.component';
import { EditPlatformComponent } from '../add-game/edit-platform/edit-platform.component';
import { AddGameComponent } from '../add-game/add-game.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public games: Games[] = [];
  public dataSourceGames!: MatTableDataSource<Games>;
  public displayeColumnGames: string[] = ['actions', 'published', 'name', 'franchise', 'categories', 'platforms', 'createdAt', 'updatedAt'];

  public categories: Category[] = [];
  public platforms: Platform[] = [];
  public dataSourcePlatform!: MatTableDataSource<Platform>;
  public dataSourceCategories!: MatTableDataSource<Category>;
  public displayedColumnCategories: string[] = ['actions', 'name'];
  public displayedColumnPlatforms: string[] = ['actions', 'name'];

  constructor (
    private _gamesService: GamesService,
    private _categoryService: CategoriesService,
    private _platformService: PlatformsService,
    public _dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getAllGames();
    this.getAllCategories();
    this.getAllPlatforms();
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

  getAllCategories(): void {
    this._categoryService.getAllCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.categories = data;
      this.dataSourceCategories = new MatTableDataSource(this.categories);
      // console.log(this.categories);
    });
  }

  getAllPlatforms(): void {
    this._platformService.getAllPlatforms().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data ()})
        )
      )
    ).subscribe(data => {
      this.platforms = data;
      this.dataSourcePlatform = new MatTableDataSource(this.platforms);
      // console.log(this.platforms);
    });
  }

  onCategoryDialogCreate(): void {
    const categoryDialog = this._dialog.open(CreateCategoryComponent, {
      width: '50%'
    });

    categoryDialog.afterClosed().subscribe(res => {

    });
  }

  onCategoryDialogEdit(row: any): void {
    const categoryDialog = this._dialog.open(EditCategoryComponent, {
      width: '50%',
      data: row
    });

    categoryDialog.afterClosed().subscribe(res => {

    });
  }

  onPlatformDialogCreate(): void {
    const platformDialog = this._dialog.open(CreatePlatformComponent, {
      width: '50%'
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }

  onPlatformDialogEdit(row: any): void {
    const platformDialog = this._dialog.open(EditPlatformComponent, {
      width: '50%',
      data: row
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }

  newGame() {
    const newGame = this._dialog.open(AddGameComponent, {
      width: '85%'
    });

    newGame.afterClosed().subscribe( res => {

    });
  }
}
