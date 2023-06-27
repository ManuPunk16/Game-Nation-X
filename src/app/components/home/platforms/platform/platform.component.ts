import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { GamesService } from 'src/app/services/games.service';
import { Games } from 'src/app/models/games.model';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';


@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit{

  public games: Games[] = [];
  public title: string = 'Plataforma: ';
  public pubTitle!: string;
  gridColumns = 5;

  // Variables de paginación
  public pagedGames: Games[] = [];
  pageSize = 15; // Número de juegos por página
  currentPage = 1; // Página actual

  constructor (
    private _gamesService: GamesService,
    private _route: ActivatedRoute,
    private _titleService: Title,
    private _metaService: Meta
  ) {

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let name = params['name'];
      this._gamesService.getPlatformsByName(name).snapshotChanges().pipe(
        take(1),
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() }
            )
          )
        )
      ).subscribe(cat => {
        this.games = cat;
        this.updatePubTitle(name);
        this.setPageMetadata(name);
      });
    });
  }

  updatePubTitle(name: string) {
    this.pubTitle = `${this.title} ${name} (${this.games.length} juegos)`;
    this._titleService.setTitle(this.pubTitle); // Establece el título de la página
  }

  setPageMetadata(name: string) {
    const description = `Juegos de la plataforma ${name}`; // Descripción de la página
    const keywords = ['juegos', 'plataforma', name]; // Palabras clave de la página

    this._metaService.updateTag({ name: 'description', content: description }); // Actualiza la etiqueta de descripción
    this._metaService.updateTag({ name: 'keywords', content: keywords.join(', ') }); // Actualiza la etiqueta de palabras clave
  }
}
