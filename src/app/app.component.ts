import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceTsService } from './services/auth.service.ts.service';
import { GamesService } from './services/games.service';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import { Games } from './models/games.model';
import { ThemeService } from './services/theme.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { CanonicalService } from './shared/canonical.service';
import { Meta, Title } from '@angular/platform-browser';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  // title = 'Game Nation X';
  keyword!: string;
  searchResults!: Observable<Games[]> | null;
  public games: Games[] = [];
  isDarkTheme = false;
  private themeSubscription!: Subscription;
  public image_banner = '../../environments/PNG/banner.webp';

  constructor (
    public _loginDialog: MatDialog,
    public authService: AuthServiceTsService,
    private _gameService: GamesService,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private canonicalService: CanonicalService,
    private meta: Meta,
    private title: Title
  ){

  }

  ngOnInit(): void {
    this.title.setTitle('GameNationX');
    this.meta.addTags([
      {
        name: 'keywords',
        content: 'videojuegos, juegos, juegos de video, juegos digitales, juegos en línea, juegos para PC, juegos para consola, juegos para móviles, juegos de rol, juegos de acción, juegos de aventuras, juegos de estrategia, juegos de simulación, juegos de plataformas, juegos de puzzle, juegos de carreras, juegos de deportes, juegos de lucha, juegos de terror, juegos de música, juegos educativos, juegos infantiles, juegos para adultos, noticias de videojuegos, reseñas de videojuegos, trucos de videojuegos, guías de videojuegos, avances de videojuegos, lanzamientos de videojuegos, eventos de videojuegos, torneos de videojuegos, personajes de videojuegos, franquicias de videojuegos, desarrolladores de videojuegos, editores de videojuegos, plataformas de videojuegos, tiendas de videojuegos, asociaciones de videojuegos, asociaciones de jugadores, comunidades de videojuegos, cultura de videojuegos, historia de los videojuegos, futuro de los videojuegos'
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Luis Hernandez' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: dayjs().toDate().toString(), scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);

    this.canonicalService.setCanonicalURL();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });

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
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.setDarkTheme(this.isDarkTheme);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
