import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceTsService } from './services/auth.service.ts.service';
import { GamesService } from './services/games.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'game-nation-x';
  keyword!: string;
  searchResults!: Observable<any[]> | null;

  constructor (
    public _loginDialog: MatDialog,
    public authService: AuthServiceTsService,
    private _gameService: GamesService
  ){

  }

  ngOnInit(): void {

  }

  search(): void {
    if (this.keyword) {
      this.searchResults = this._gameService.searchItems(this.keyword);
    } else {
      this.searchResults = null;
    }
  }
}
