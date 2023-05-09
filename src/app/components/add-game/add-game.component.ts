import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GamesService } from '../../services/games.service';
import { Games, Category, Platform } from '../../models/games.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { PlatformsService } from 'src/app/services/platforms.service';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  public games: Games = new Games();
  public categories: Category[] = [];
  public platforms: Platform[] = [];
  public dataSourcePlatform!: MatTableDataSource<Platform>;
  public dataSourceCategories!: MatTableDataSource<Category>;
  public displayedColumnCategories: string[] = ['actions', 'name'];
  public displayedColumnPlatforms: string[] = ['actions', 'name'];
  gameForm: FormGroup;
  submitted = false;

  constructor(
    private _gamesService: GamesService,
    private _categoryService: CategoriesService,
    private _platformService: PlatformsService,
    public _dialog: MatDialog
  ) {
    this.gameForm = new FormGroup({
      name: new FormControl('', Validators.required),
      release_date: new FormControl(''),
      publication_date: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required),
      classification: new FormControl(''),
      developers: new FormControl(''),
      editors: new FormControl(''),
      franchise: new FormControl(''),
      game_modes: new FormControl(''),
      categories: new FormControl('', Validators.required),
      platforms: new FormControl('', Validators.required),
      lang_interface: new FormControl(''),
      lang_subtitles: new FormControl(''),
      lang_voices: new FormControl(''),
      published: new FormControl(false),
      createdAt: new FormControl(moment().toDate()),
      updatedAt: new FormControl(moment().toDate()),

      req_min_so: new FormControl(''),
      req_min_directx: new FormControl(''),
      req_min_graphic_card: new FormControl(''),
      req_min_network: new FormControl(''),
      req_min_ram: new FormControl(''),
      req_min_storage: new FormControl(''),

      req_rec_so: new FormControl(''),
      req_rec_directx: new FormControl(''),
      req_rec_graphic_card: new FormControl(''),
      req_rec_network: new FormControl(''),
      req_rec_ram: new FormControl(''),
      req_rec_storage: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllPlatforms();
  }

  onSubmit() {
    // console.log(this.gameForm.value);
    if (this.gameForm.valid) {
      this._gamesService.createGame(this.gameForm.value).then(() => {
        this.submitted = true;
      });
    } else {
      console.log("No es valido");
    }
  }

  newGame(): void {
    this.submitted = false;
    this.games = new Games();
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
}
