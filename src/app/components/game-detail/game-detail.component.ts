import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Classification, Games, Languages } from 'src/app/models/games.model';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  public games?: Games;
  public languages: Languages[] = [];
  public combinedData!: MatTableDataSource<any>;
  classificationDescriptors!: string | undefined;
  public esrb = '';
  displayColumns: string[] = ['lang_interface', 'lang_subtitles', 'lang_voices'];

  constructor (
    private _gameService: GamesService,
    private _route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._gameService.getGameById(id).valueChanges().subscribe(game => {
        this.games = game;

        // Combine the language arrays into a single array of objects
        const combinedData = [];
        const maxLength = Math.max(
          game?.lang_interface?.length || 0,
          game?.lang_subtitles?.length || 0,
          game?.lang_voices?.length || 0
        );
        for (let i = 0; i < maxLength; i++) {
          combinedData.push({
            lang_interface: game?.lang_interface?.[i],
            lang_subtitles: game?.lang_subtitles?.[i],
            lang_voices: game?.lang_voices?.[i]
          });
        }
        this.combinedData = new MatTableDataSource(combinedData);

        // Define the display columns based on the combinedData array
        this.displayColumns = Object.keys(combinedData[0]);

        this.classificationDescriptors = this.games?.classification_descriptors?.join(', ').replace(/,/g, ', ');
        // console.log(this.games);

        const matchingClassification = Classification.classification.find((c) => c.title === this.games?.classification);
        if (matchingClassification) {
          this.esrb = matchingClassification.image;
        }
      });
    });
  }

}
