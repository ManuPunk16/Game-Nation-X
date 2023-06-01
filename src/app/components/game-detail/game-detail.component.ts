import { Component, OnDestroy, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Classification, Games, Languages, GameModes } from 'src/app/models/games.model';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Editor } from 'ngx-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit, OnDestroy {

  editor!: Editor;
  html!: string;
  safeAbout!: SafeHtml;

  public games?: Games;
  public languages: Languages[] = [];
  public gameModes: any[] = [];
  public combinedData!: MatTableDataSource<any>;
  classificationDescriptors!: string | undefined;
  public esrb = '';
  public mode: any[] = [];
  displayColumns: string[] = ['lang_interface', 'lang_subtitles', 'lang_voices'];
  isDarkTheme!: boolean;

  constructor (
    private _gameService: GamesService,
    private _route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private themeService: ThemeService
  ) {

  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // onEditorContentChange(content: string | object) {
  //   if (typeof content === 'string') {
  //     this.html = content;
  //   } else {
  //     const paragraphs = (content as any).content.filter((block: any) => block.type === 'paragraph');
  //     const textContent = paragraphs.map((paragraph: any) => paragraph.content.map((text: any) => text.text).join('')).join('');
  //     this.html = textContent;
  //   }
  // }

  ngOnInit(): void {
    this.editor = new Editor();

    this._route.params.subscribe(params => {
      let id = params['id'];
      this._gameService.getGameById(id).valueChanges().subscribe(game => {
        this.games = game;
        // console.log(this.games);
        this.safeAbout = this.games?.about ? this.sanitizer.bypassSecurityTrustHtml(this.games.about) : '';
        this.combineDataToTable();
        this.clasificationData();
        this.matchImageWithNameGameMode();
      });
    });

    this.themeService.isDarkTheme$.subscribe(isDarkTheme => {
      this.isDarkTheme = isDarkTheme;
      this.matchImageWithNameGameMode();
    });

  }

  boton() {
    console.log("Contenido: ", this.html);
  }

  combineDataToTable() {
    // Combine the language arrays into a single array of objects
    const combinedData = [];
    const maxLength = Math.max(
      this.games?.lang_interface?.length || 0,
      this.games?.lang_subtitles?.length || 0,
      this.games?.lang_voices?.length || 0
    );
    for (let i = 0; i < maxLength; i++) {
      combinedData.push({
        lang_interface: this.games?.lang_interface?.[i],
        lang_subtitles: this.games?.lang_subtitles?.[i],
        lang_voices: this.games?.lang_voices?.[i]
      });
    }
    this.combinedData = new MatTableDataSource(combinedData);

    // Define the display columns based on the combinedData array
    this.displayColumns = Object.keys(combinedData[0]);
  }

  clasificationData() {
    this.classificationDescriptors = this.games?.classification_descriptors?.join(', ').replace(/,/g, ', ');
    const matchingClassification = Classification.classification.find((c) => c.title === this.games?.classification);
    if (matchingClassification) {
      this.esrb = matchingClassification.image;
    }
  }

  matchImageWithNameGameMode() {
    this.mode = [];
    for (const gameMode of this.games?.game_modes || []) {
      const matchingMode = GameModes.game_modes.find(mode => mode.name === gameMode);
      if (matchingMode) {
        const image = this.isDarkTheme ? matchingMode.white_image : matchingMode.image;
        this.mode.push({ ...matchingMode, image });
      }
    }
  }
}
