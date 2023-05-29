import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { EditGameComponent } from '../edit-game/edit-game.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginatorGames!: MatPaginator;

  @ViewChild(MatSort)
  sortGames!: MatSort;

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
    public _dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {

  }

  ngOnInit(): void {
    this.getAllGames();
    this.getAllCategories();
    this.getAllPlatforms();
    // this.newGame();
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
      this.dataSourceGames.paginator = this.paginatorGames;
      this.dataSourceGames.sort = this.sortGames;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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

  onGameEdit(row: any) {
    // console.log(row);
    const editGame = this._dialog.open(EditGameComponent, {
      width: '85%',
      data: row.id
    });

    editGame.afterClosed().subscribe( res => {

    });
  }
}
