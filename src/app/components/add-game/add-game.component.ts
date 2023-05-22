import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GamesService } from '../../services/games.service';
import { Games, Category, Platform, OperativeSystem, Classification, ClassificationDescriptors, Languages, GameModes } from '../../models/games.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { PlatformsService } from 'src/app/services/platforms.service';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Editor } from 'ngx-editor';
// import { FileUploadService } from 'src/app/services/file-upload.service';
// import { FileUpload } from 'src/app/models/file-upload.model';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit, OnDestroy {

  editor!: Editor;
  html!: string;

  public games: Games = new Games();
  public categories: Category[] = [];
  public platforms: Platform[] = [];
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
  // percentage = 0;
  // selectedFiles?: FileList;
  // currentFileUpload?: FileUpload;
  // urls: FileUpload[] = [];
  // fileUploads?: any[];

  constructor(
    private _gamesService: GamesService,
    private _categoryService: CategoriesService,
    private _platformService: PlatformsService,
    public _dialog: MatDialog,
    // private uploadService: FileUploadService
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
  }

  // onSubmit() {
  //   // console.log(this.gameForm.value);
  //   if (this.gameForm.valid) {
  //     this._gamesService.createGame(this.gameForm.value).then(() => {
  //       this.submitted = true;
  //     });
  //   } else {
  //     console.log("No es valido");
  //   }
  // }

  // selectFile(event: any) {
  //   this.selectedFiles = event.target.files;
  // }

  // upload(event: Event) {
  //   if (this.selectedFiles) {
  //     const fileUploads: FileUpload[] = [];

  //     for (let i = 0; i < this.selectedFiles.length; i++) {
  //       const file = this.selectedFiles.item(i);
  //       if (file) {
  //         const fileUpload: FileUpload = {
  //           file: file,
  //           url: '',
  //           name: '',
  //           key: ''
  //         };
  //         fileUploads.push(fileUpload);
  //       }
  //     }
  //     this.uploadService.pushFilesToStorage(fileUploads).subscribe((percentage) => {
  //       this.percentage = Math.round(percentage ? percentage : 0);
  //       console.log(`Progreso de carga: ${percentage}%`);
  //     });
  //   }
  // }

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
}
