import { Component, OnInit } from '@angular/core';
import { PlatformsService } from 'src/app/services/platforms.service';
import { GamesService } from 'src/app/services/games.service';
import { Platform } from 'src/app/models/games.model';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css']
})
export class PlatformsComponent implements OnInit {

  public platforms: Platform[] = [];
  platformCountMap = new Map<String, Number>();

  constructor (
    private _platformService: PlatformsService,
    private _gamesService: GamesService,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this.getGamesWithPlatformsCount();
  }

  getGamesWithPlatformsCount() {
    this._platformService.getAllPlatforms().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.platforms = data;
      // console.log(this.platforms);
      this.platforms.forEach(plat => {
        if (plat?.name) {
          this._gamesService.getPlatformsCountByName(plat.name).subscribe(data => {
            plat.total = data;
            this.platforms.sort((a, b) => (b.total || 0) - (a.total || 0)).filter(plat => plat?.total !== undefined && plat.total <= 0);
          });
        }
      });
    });
  }

  onClicked(item: any) {
    this._router.navigate(['platform/', item.name]);
  }

}
