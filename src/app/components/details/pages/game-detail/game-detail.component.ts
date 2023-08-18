import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { GamesService } from 'src/app/services/games.service';
import { Classification, Games, Languages, GameModes } from 'src/app/models/games.model';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Editor } from 'ngx-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ThemeService } from 'src/app/services/theme.service';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/models/rating.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as dayjs from 'dayjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from 'src/app/services/user';
import { AuthServiceTsService } from 'src/app/services/auth.service.ts.service';
import { MatDialog } from '@angular/material/dialog';
import { EditReviewComponent } from './edit-review/edit-review.component';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit, OnDestroy {

  editor!: Editor;
  html!: string;
  safeAbout!: SafeHtml;

  public ratings: Rating[] = [];
  ratingForm!: FormGroup;
  rating: number = 0;
  userData: any;
  valueColor!: number;
  numComments!: number;

  public games?: Games;
  public languages: Languages[] = [];
  public gameModes: any[] = [];
  public combinedData!: MatTableDataSource<any>;
  classificationDescriptors!: string | undefined;
  public esrb = '';
  public mode: any[] = [];
  displayColumns: string[] = ['lang_interface', 'lang_subtitles', 'lang_voices'];
  isDarkTheme!: boolean;
  public dataLanguage = false;

  constructor (
    private _gameService: GamesService,
    private _route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private themeService: ThemeService,
    private ratingService: RatingService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public authService: AuthServiceTsService,
    public _dialog: MatDialog,
    private meta: Meta,
    private title: Title
  ) {
    this.ratingForm = new FormGroup({
      comment: new FormControl('')
    });
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.ratingForm = new FormGroup({
          gameId: new FormControl('', Validators.required),
          username: new FormControl(this.userData.displayName, Validators.required),
          email: new FormControl(this.userData.email, Validators.required),
          photoURL: new FormControl(this.userData.photoURL, Validators.required),
          rating: new FormControl('', Validators.required),
          comment: new FormControl(''),
          updatedAt: new FormControl(dayjs().toDate())
        });
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.getAndValidData();
    this.darkTheme();
  }

  getAndValidData(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._gameService.getGameById(id).valueChanges().subscribe((game: Games | undefined) => {
        this.games = game;

        if (this.games) {
          this.safeAbout = this.games?.about ? this.sanitizer.bypassSecurityTrustHtml(this.games.about) : '';

          const updatedAt = this.games.updatedAt;

          if (updatedAt instanceof Date) {
            const updatedAtFormatted = updatedAt.toISOString().split('T')[0];

            this.meta.addTags([
              { name: 'description', content: this.games.about }, //ajustar keywords
              { name: 'robots', content: 'index, follow' },
              { name: 'author', content: 'Luis Hernandez' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              { name: 'date', content: updatedAtFormatted, scheme: 'YYYY-MM-DD' },
              { charset: 'UTF-8' }
            ]);
          } else {
            this.meta.addTags([
              { name: 'description', content: this.games.about }, //ajustar keywords
              { name: 'robots', content: 'index, follow' },
              { name: 'author', content: 'Luis Hernandez' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              { charset: 'UTF-8' }
            ]);
          }

          this.title.setTitle(this.games.name);
        }
        // console.log(this.games?.profile_image);
        if (this.games?.classification) {
          this.clasificationData();
        }
        this.matchImageWithNameGameMode();
        this.combineDataToTable();

        this.loadRatings(id);
        this.loadRating(id);
        if (this.userData) {
          const gameIdRef = this.firestore.doc('/games/' + id).ref;
          this.ratingForm.patchValue({
            gameId: gameIdRef
          });
        }
      });
    });
  }

  darkTheme(): void {
    this.themeService.isDarkTheme$.subscribe(isDarkTheme => {
      this.isDarkTheme = isDarkTheme;
      this.matchImageWithNameGameMode();
    });
  }

  combineDataToTable() {
    // Combine the language arrays into a single array of objects
    const combinedData = [];
    const maxLength = Math.max(
      this.games?.lang_interface?.length || 0,
      this.games?.lang_subtitles?.length || 0,
      this.games?.lang_voices?.length || 0
    );
    if (maxLength) {
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
      this.dataLanguage = true;
    } else {
      this.dataLanguage = false;
    }
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

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      role: ''
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  setRating(value: number): void {
    if (this.userData) {
      this.rating = value || 0;
      this.ratingForm.patchValue({
        rating: this.rating
      });
    }
  }

  onSubmit(): void {
    const id = this.ratingForm.value.gameId;
    const email = this.ratingForm.value.email;
    this.ratingService.checkEmailExists(id, email)
    .then((emailExists) => {
      if (emailExists) {
        console.log('No puedes crear otra reseña, correo duplicado.');
        this.ratingForm.disable();
      } else {
        if (this.ratingForm.value.rating == '') {
          this.rating = 0;
          this.ratingForm.patchValue({
            rating: this.rating
          });
        }
        const rating: Rating = this.ratingForm.value;
        this.ratingService.addRating(rating)
          .then(() => {
            console.log('Rating added successfully');
            this.ratingForm.reset();
          })
          .catch(error => {
            console.error('Error adding rating:', error);
          });
      }
    })
    .catch((error) => {
      console.error('Error al verificar el correo electrónico:', error);
    });
  }

  loadRatings(id: string): void {
    const gameId = 'games/' + id;
    this.ratingService.getCommentsByGameId(gameId).subscribe(ratings => {
      this.ratings = ratings;
      // console.log(this.ratings);
      this.numComments = ratings.length;
    });
  }

  loadRating(id: string): void {
    const gameId = 'games/' + id;
    this.ratingService.getAverageRating(gameId).subscribe(ratings => {
      const value = isNaN(ratings) ? 0 : ratings;
      this.valueColor = value;
    });
  }

  update(id: any): void {
    // console.log(id);
    const editRatingDialog = this._dialog.open(EditReviewComponent, {
      width: "50%",
      data: id
    });

    editRatingDialog.afterClosed().subscribe(res => {

    });
  }
}
