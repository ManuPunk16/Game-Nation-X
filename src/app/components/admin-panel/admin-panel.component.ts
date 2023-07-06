import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GamesService } from '../../services/games.service';
import { Games } from '../../models/games.model';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddGameComponent } from '../add-game/add-game.component';
import { EditGameComponent } from '../edit-game/edit-game.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  providers: [DatePipe]
})
export class AdminPanelComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginatorGames!: MatPaginator;

  @ViewChild(MatSort)
  sortGames!: MatSort;

  public games: Games[] = [];
  public dataSourceGames!: MatTableDataSource<Games>;
  public displayeColumnGames: string[] = ['actions', 'published', 'name', 'publication_date', 'categories', 'createdAt', 'updatedAt'];

  constructor (
    private _gamesService: GamesService,
    public _dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    public datepipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames() {
    this._gamesService.getAllGames().snapshotChanges().pipe(

      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      map(data =>
        data.filter(item => item.createdAt) // filtrar los documentos que tienen createdAt definido
            .sort((a, b) => (b.createdAt as unknown as number) - (a.createdAt as unknown as number)) // ordenar por createdAt en orden descendente
      )
    ).subscribe(data => {
      this.games = data;
      this.dataSourceGames = new MatTableDataSource(this.games);
      this.dataSourceGames.paginator = this.paginatorGames;
      this.dataSourceGames.sort = this.sortGames;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  updatePublished(item: any, event: any): void {
    // console.log(`El valor del toggle es ${event.checked}`, row.id);
    if (item.id) {
      this._gamesService.updateGame(item.id, { published: event.checked })
      .then(() => {
        this.games = event.checked;
      })
      .catch(err => console.log(err));
    }
  }

  newGame() {
    const newGame = this._dialog.open(AddGameComponent, {
      width: '85%'
    });

    newGame.afterClosed().subscribe( res => {

    });
  }

  onGameEdit(row: any) {
    // console.log(row);
    const editGame = this._dialog.open(EditGameComponent, {
      width: '85%',
      data: row.id
    });

    editGame.afterClosed().subscribe( res => {

    });
  }

  generateSitemap() {
    const xmlString = this.buildXmlString(this.games);
    this.saveFile(xmlString, 'sitemap.xml', 'application/xml');
  }

  buildXmlString(games: any[]): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
    const urlsetStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    const urlsetEnd = '</urlset>';
    let xmlBody = '';

    games.forEach(game => {
      const gameUrl = `https://gamenax.com/game-details/${game.id}`;
      const lastMod = this.datepipe.transform(game.updatedAt.toDate(), 'yyyy-MM-dd');
      const urlXml = `<url>\n<loc>${gameUrl}</loc>\n<lastmod>${lastMod}</lastmod>\n</url>\n`;
      xmlBody += urlXml;
    });

    return xmlHeader + urlsetStart + xmlBody + urlsetEnd;
  }

  saveFile(data: string, filename: string, type: string) {
    const blob = new Blob([data], { type: type });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.style.display = 'none';

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }
}
