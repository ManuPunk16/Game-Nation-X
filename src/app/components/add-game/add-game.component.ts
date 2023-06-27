import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GamesService } from '../../services/games.service';
import {
  Games,
  Category,
  Platform,
  GameModes,
  Classification,
  ClassificationDescriptors,
  Languages,
  OperativeSystem,
  Developers, Editors, Franchise } from 'src/app/models/games.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { PlatformsService } from 'src/app/services/platforms.service';
import { map, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { DevelopersEditorsService } from 'src/app/services/developers-editors.service';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreatePlatformComponent } from './create-platform/create-platform.component';
import { CreateEditorsComponent } from '../admin-panel/editors-table/create-editors/create-editors.component';
import { CreateDevelopersComponent } from '../admin-panel/developers-table/create-developers/create-developers.component';
import { CreateFranchiseComponent } from '../admin-panel/franchises-table/create-franchise/create-franchise.component';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit, OnDestroy {

  editor!: Editor;
  html!: string;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  public games: Games = new Games();
  public categories: Category[] = [];
  public platforms: Platform[] = [];
  public developers: Developers[] = [];
  public editors: Editors[] = [];
  public franchises: Franchise[] = [];
  public languages = Languages.languages;
  public operativeSystem = OperativeSystem.operative_system;
  public classification = Classification.classification;
  public classificationDescriptors = ClassificationDescriptors.classification_descriptors;
  public gameMode = GameModes.game_modes;

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
    public _dialog: MatDialog,
    // private uploadService: FileUploadService
    private _devs: DevelopersEditorsService
  ) {
    this.gameForm = new FormGroup({
      name: new FormControl('', Validators.required),
      release_date: new FormControl(''),
      images: new FormControl(''),
      youtube_links: new FormControl(''),
      publication_date: new FormControl('', Validators.required),
      about: new FormControl(''),
      classification: new FormControl(''),
      classification_descriptors: new FormControl(''),
      developers: new FormControl(''),
      editors: new FormControl(''),
      franchise: new FormControl(''),
      game_modes: new FormControl(''),
      categories: new FormControl('', Validators.required),
      platforms: new FormControl('', Validators.required),
      operative_systems: new FormControl(''),
      lang_interface: new FormControl(''),
      lang_subtitles: new FormControl(''),
      lang_voices: new FormControl(''),
      published: new FormControl(false),
      createdAt: new FormControl(moment().toDate()),
      updatedAt: new FormControl(moment().toDate()),

      windows_req_min_so: new FormControl(''),
      windows_req_min_processor: new FormControl(''),
      windows_req_min_directx: new FormControl(''),
      windows_req_min_graphic_card: new FormControl(''),
      windows_req_min_network: new FormControl(''),
      windows_req_min_ram: new FormControl(''),
      windows_req_min_storage: new FormControl(''),

      windows_req_rec_so: new FormControl(''),
      windows_req_rec_processor: new FormControl(''),
      windows_req_rec_directx: new FormControl(''),
      windows_req_rec_graphic_card: new FormControl(''),
      windows_req_rec_network: new FormControl(''),
      windows_req_rec_ram: new FormControl(''),
      windows_req_rec_storage: new FormControl(''),

      mac_req_min_so: new FormControl(''),
      mac_req_min_processor: new FormControl(''),
      mac_req_min_directx: new FormControl(''),
      mac_req_min_graphic_card: new FormControl(''),
      mac_req_min_network: new FormControl(''),
      mac_req_min_ram: new FormControl(''),
      mac_req_min_storage: new FormControl(''),

      mac_req_rec_so: new FormControl(''),
      mac_req_rec_processor: new FormControl(''),
      mac_req_rec_directx: new FormControl(''),
      mac_req_rec_graphic_card: new FormControl(''),
      mac_req_rec_network: new FormControl(''),
      mac_req_rec_ram: new FormControl(''),
      mac_req_rec_storage: new FormControl(''),

      linux_req_min_so: new FormControl(''),
      linux_req_min_processor: new FormControl(''),
      linux_req_min_directx: new FormControl(''),
      linux_req_min_graphic_card: new FormControl(''),
      linux_req_min_network: new FormControl(''),
      linux_req_min_ram: new FormControl(''),
      linux_req_min_storage: new FormControl(''),

      linux_req_rec_so: new FormControl(''),
      linux_req_rec_processor: new FormControl(''),
      linux_req_rec_directx: new FormControl(''),
      linux_req_rec_graphic_card: new FormControl(''),
      linux_req_rec_network: new FormControl(''),
      linux_req_rec_ram: new FormControl(''),
      linux_req_rec_storage: new FormControl(''),
    });
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.getAllCategories();
    this.getAllPlatforms();

    this.languages.sort((a, b) => a.language.localeCompare(b.language));
    this.getAllDevelopers();
    this.getAllEditors();
    this.getAllFranchises();
  }

  onSubmit() {
    // console.log(this.gameForm.value);
    if (this.gameForm.valid) {
      this._gamesService.createGame(this.gameForm.value).then(() => {
        this.submitted = true;
      });
    } else {
      console.log("Formulario no valido.");
    }
  }

  onEditorContentChange(content: string | object) {
    if (typeof content === 'string') {
      this.html = content;
    } else {
      const paragraphs = (content as any).content.filter((block: any) => block.type === 'paragraph');
      const textContent = paragraphs.map((paragraph: any) => paragraph.content.map((text: any) => text.text).join('')).join('');
      this.html = textContent;
    }
  }

  boton() {
    console.log("Contenido: ", this.html);
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

  getAllDevelopers(): void {
    this._devs.getAllDevelopers().snapshotChanges().pipe(

      map(changes =>
        changes.map(c =>
          ({ dev: c.payload.doc.id, ...c.payload.doc.data ()})
        )
      )
    ).subscribe(data => {
      this.developers = data;
      // console.log(this.developers);
    });
  }

  getAllEditors(): void {
    this._devs.getAllEditors().snapshotChanges().pipe(

      map(changes =>
        changes.map(c =>
          ({ edit: c.payload.doc.id, ...c.payload.doc.data ()})
        )
      )
    ).subscribe(data => {
      this.editors = data;
      // console.log(this.editors);
    });
  }

  getAllFranchises(): void {
    this._devs.getAllFranchises().snapshotChanges().pipe(

      map(changes =>
        changes.map(c =>
          ({ fran: c.payload.doc.id, ...c.payload.doc.data ()})
        )
      )
    ).subscribe(data => {
      this.franchises = data;
      // console.log(this.franchises);
    });
  }

  onCategoryDialogCreate(): void {
    const categoryDialog = this._dialog.open(CreateCategoryComponent, {
      width: '50%'
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

  onEditorsformDialogCreate(): void {
    const platformDialog = this._dialog.open(CreateEditorsComponent, {
      width: '50%'
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }

  onDeveloperDialogCreate(): void {
    const platformDialog = this._dialog.open(CreateDevelopersComponent, {
      width: '50%'
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }

  onFranchiseDialogCreate(): void {
    const platformDialog = this._dialog.open(CreateFranchiseComponent, {
      width: '50%'
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }
}
