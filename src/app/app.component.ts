import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceTsService } from './services/auth.service.ts.service';
import { GamesService } from './services/games.service';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import { Games } from './models/games.model';
import { ThemeService } from './services/theme.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  title = 'game-nation-x';
  keyword!: string;
  searchResults!: Observable<any[]> | null;
  public games: Games[] = [];
  isDarkTheme = false;
  private themeSubscription!: Subscription;
  public image_banner = '../../environments/PNG/Banner.png';

  constructor (
    public _loginDialog: MatDialog,
    public authService: AuthServiceTsService,
    private _gameService: GamesService,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver
  ){

  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe(isDarkTheme => {
      this.isDarkTheme = isDarkTheme;
    });
  }

  search(): void {
    if (this.keyword) {
      this.searchResults = this._gameService.searchItems(this.keyword);
    } else {
      this.searchResults = null;
    }
  }

  clearSearch(): void {
    this.keyword = '';
    this.searchResults = null;
  }

  toggleTheme() {
    // console.log(event.checked);
    // if(event.checked == true) {
    //   this._document.body.classList.add('dark-mode');
    // } else {
    //   this._document.body.classList.remove('dark-mode');
    // }
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.setDarkTheme(this.isDarkTheme);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
