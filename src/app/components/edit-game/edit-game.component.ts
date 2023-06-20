import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GamesService } from 'src/app/services/games.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { PlatformsService } from 'src/app/services/platforms.service';
import { DevelopersEditorsService } from 'src/app/services/developers-editors.service';
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
import * as moment from 'moment';
import { map, take } from 'rxjs';
import { Editor, Toolbar } from 'ngx-editor';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ImageCompressionService } from 'src/app/services/image-compression.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit, OnDestroy {

  editor!: Editor;
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
  html!: string;
  message = '';

  submitted = false;
  gameForm: FormGroup;
  public game?: Games;
  public categories: Category[] = [];
  public platforms: Platform[] = [];
  public developers: Developers[] = [];
  public editors: Editors[] = [];
  public franchises: Franchise[] = [];
  public gameMode = GameModes.game_modes;
  public classification = Classification.classification;
  public classificationDescriptors = ClassificationDescriptors.classification_descriptors;
  public languages = Languages.languages;
  public operativeSystem = OperativeSystem.operative_system;

  public selectedFiles!: File;
  imageUrl!: string;
  deleted = false;

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _gameService: GamesService,
    private _categoryService: CategoriesService,
    private _platformService: PlatformsService,
    private _devs: DevelopersEditorsService,
    private imageUploadService: FileUploadService,
    private dialog: MatDialog,
    private imageCompressionService: ImageCompressionService
  ) {
    this.gameForm = new FormGroup({
      name: new FormControl('', Validators.required),
      release_date: new FormControl(''),
      profile_image: new FormControl(''),
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
    this.getGameById();
    this.editor = new Editor();
    this.message = '';
    this.getAllCategories();
    this.getAllPlatforms();
    this.getAllDevelopers();
    this.getAllEditors();
    this.getAllFranchises();
  }

  ngOnChanges(): void {
    this.message = '';
  }

  getGameById() {
    let id = this.data;
    this._gameService.getGameById(id).valueChanges().subscribe(game => {
      this.game = game;
      const nano = this.game?.publication_date.seconds;

      if (nano) {
        const millisecondsDate = nano * 1000;
        const date = new Date(millisecondsDate);

        this.gameForm.patchValue({
          name: game?.name,
          release_date: game?.release_date,
          publication_date: date,
          about: game?.about,
          classification: game?.classification,
          classification_descriptors: game?.classification_descriptors,
          developers: game?.developers,
          editors: game?.editors,
          franchise: game?.franchise,
          game_modes: game?.game_modes,
          categories: game?.categories,
          platforms: game?.platforms,
          operative_systems: game?.operative_systems,
          lang_interface: game?.lang_interface,
          lang_subtitles: game?.lang_subtitles,
          lang_voices: game?.lang_voices,
          published: game?.published,
          updatedAt: game?.updatedAt,

          windows_req_min_so: game?.windows_req_min_so,
          windows_req_min_processor: game?.windows_req_min_processor,
          windows_req_min_directx: game?.windows_req_min_directx,
          windows_req_min_graphic_card: game?.windows_req_min_graphic_card,
          windows_req_min_network: game?.windows_req_min_network,
          windows_req_min_ram: game?.windows_req_min_ram,
          windows_req_min_storage: game?.windows_req_min_storage,

          windows_req_rec_so: game?.windows_req_rec_so,
          windows_req_rec_processor: game?.windows_req_rec_processor,
          windows_req_rec_directx: game?.windows_req_rec_directx,
          windows_req_rec_graphic_card: game?.windows_req_rec_graphic_card,
          windows_req_rec_network: game?.windows_req_rec_network,
          windows_req_rec_ram: game?.windows_req_rec_ram,
          windows_req_rec_storage: game?.windows_req_rec_storage,

          mac_req_min_so: game?.mac_req_min_so,
          mac_req_min_processor: game?.mac_req_min_processor,
          mac_req_min_directx: game?.mac_req_min_directx,
          mac_req_min_graphic_card: game?.mac_req_min_graphic_card,
          mac_req_min_network: game?.mac_req_min_network,
          mac_req_min_ram: game?.mac_req_min_ram,
          mac_req_min_storage: game?.mac_req_min_storage,

          mac_req_rec_so: game?.mac_req_rec_so,
          mac_req_rec_processor: game?.mac_req_rec_processor,
          mac_req_rec_directx: game?.mac_req_rec_directx,
          mac_req_rec_graphic_card: game?.mac_req_rec_graphic_card,
          mac_req_rec_network: game?.mac_req_rec_network,
          mac_req_rec_ram: game?.mac_req_rec_ram,
          mac_req_rec_storage: game?.mac_req_rec_storage,

          linux_req_min_so: game?.linux_req_min_so,
          linux_req_min_processor: game?.linux_req_min_processor,
          linux_req_min_directx: game?.linux_req_min_directx,
          linux_req_min_graphic_card: game?.linux_req_min_graphic_card,
          linux_req_min_network: game?.linux_req_min_network,
          linux_req_min_ram: game?.linux_req_min_ram,
          linux_req_min_storage: game?.linux_req_min_storage,

          linux_req_rec_so: game?.linux_req_rec_so,
          linux_req_rec_processor: game?.linux_req_rec_processor,
          linux_req_rec_directx: game?.linux_req_rec_directx,
          linux_req_rec_graphic_card: game?.linux_req_rec_graphic_card,
          linux_req_rec_network: game?.linux_req_rec_network,
          linux_req_rec_ram: game?.linux_req_rec_ram,
          linux_req_rec_storage: game?.linux_req_rec_storage
        });
      } else {
        this.gameForm.patchValue({
          name: game?.name,
          release_date: game?.release_date,
          publication_date: game?.publication_date,
          about: game?.about,
          classification: game?.classification,
          classification_descriptors: game?.classification_descriptors,
          developers: game?.developers,
          editors: game?.editors,
          franchise: game?.franchise,
          game_modes: game?.game_modes,
          categories: game?.categories,
          platforms: game?.platforms,
          operative_systems: game?.operative_systems,
          lang_interface: game?.lang_interface,
          lang_subtitles: game?.lang_subtitles,
          lang_voices: game?.lang_voices,
          published: game?.published,
          updatedAt: game?.updatedAt,

          windows_req_min_so: game?.windows_req_min_so,
          windows_req_min_processor: game?.windows_req_min_processor,
          windows_req_min_directx: game?.windows_req_min_directx,
          windows_req_min_graphic_card: game?.windows_req_min_graphic_card,
          windows_req_min_network: game?.windows_req_min_network,
          windows_req_min_ram: game?.windows_req_min_ram,
          windows_req_min_storage: game?.windows_req_min_storage,

          windows_req_rec_so: game?.windows_req_rec_so,
          windows_req_rec_processor: game?.windows_req_rec_processor,
          windows_req_rec_directx: game?.windows_req_rec_directx,
          windows_req_rec_graphic_card: game?.windows_req_rec_graphic_card,
          windows_req_rec_network: game?.windows_req_rec_network,
          windows_req_rec_ram: game?.windows_req_rec_ram,
          windows_req_rec_storage: game?.windows_req_rec_storage,

          mac_req_min_so: game?.mac_req_min_so,
          mac_req_min_processor: game?.mac_req_min_processor,
          mac_req_min_directx: game?.mac_req_min_directx,
          mac_req_min_graphic_card: game?.mac_req_min_graphic_card,
          mac_req_min_network: game?.mac_req_min_network,
          mac_req_min_ram: game?.mac_req_min_ram,
          mac_req_min_storage: game?.mac_req_min_storage,

          mac_req_rec_so: game?.mac_req_rec_so,
          mac_req_rec_processor: game?.mac_req_rec_processor,
          mac_req_rec_directx: game?.mac_req_rec_directx,
          mac_req_rec_graphic_card: game?.mac_req_rec_graphic_card,
          mac_req_rec_network: game?.mac_req_rec_network,
          mac_req_rec_ram: game?.mac_req_rec_ram,
          mac_req_rec_storage: game?.mac_req_rec_storage,

          linux_req_min_so: game?.linux_req_min_so,
          linux_req_min_processor: game?.linux_req_min_processor,
          linux_req_min_directx: game?.linux_req_min_directx,
          linux_req_min_graphic_card: game?.linux_req_min_graphic_card,
          linux_req_min_network: game?.linux_req_min_network,
          linux_req_min_ram: game?.linux_req_min_ram,
          linux_req_min_storage: game?.linux_req_min_storage,

          linux_req_rec_so: game?.linux_req_rec_so,
          linux_req_rec_processor: game?.linux_req_rec_processor,
          linux_req_rec_directx: game?.linux_req_rec_directx,
          linux_req_rec_graphic_card: game?.linux_req_rec_graphic_card,
          linux_req_rec_network: game?.linux_req_rec_network,
          linux_req_rec_ram: game?.linux_req_rec_ram,
          linux_req_rec_storage: game?.linux_req_rec_storage
        });
      }
    });
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

  selectFile(event: any): void {
    this.selectedFiles = event.target.files[0];
  }

  onSubmit() {
    let id = this.data;
    this.gameForm.value.updatedAt = moment().toDate();
    let data = this.gameForm.value;

    if (!data.profile_image) {
      this._gameService.getGameById(id).valueChanges().pipe(
        take(1)
      ).subscribe(
        game => {
          const image = game?.profile_image;
          data.profile_image = image;

          this._gameService.updateGame(id, data)
          .then(() => {
            this.message = 'El juego ha sido actualizado!';
            this.submitted = true;
          })
          .catch(err => console.log(err));
            }
      );

    } else {
      this._gameService.updateGame(id, data)
      .then(() => {
        this.message = 'El juego ha sido actualizado!';
        this.submitted = true;
      })
      .catch(err => console.log(err));
    }
  }

  async upload() {
    if (this.selectedFiles) {
      try {
        const compressedImage = await this.imageCompressionService.compressImage(
          this.selectedFiles
        );
        const compressedFile = new File([compressedImage], this.gameForm.value.name, {
          type: 'image/webp'
        });

        const imageUrl = await this.imageUploadService.uploadImage(
          compressedFile
        );
        this.imageUrl = this.extractFileName(imageUrl);
        this.gameForm.patchValue({ profile_image: this.imageUrl });

        let id = this.data;
        this.gameForm.value.updatedAt = moment().toDate();
        let data = this.gameForm.value;
        // console.log(data.profile_image);

        this._gameService.updateGame(id, data)
          .then(() => {
            this.message = 'El juego ha sido actualizado!';
            this.submitted = true;
          })
          .catch(err => console.log(err));

        // console.log(this.gameForm.value.profile_image);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }

  private extractFileName(path: string): string {
    if (path) {
      const startIndex = path.lastIndexOf('\\') + 1;
      return path.substr(startIndex);
    }
    return '';
  }

  deleteGame(): void {
    let id = this.data;
    if (id) {
      const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: '¿Estás seguro de que deseas eliminar el registro?'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._gameService.deleteGame(id)
            .then(() => {
              this.deleted = true;
              this.message = '¡Eliminado correctamente!';
            })
            .catch(err => console.log(err));
        }
      });
    }
  }
}
