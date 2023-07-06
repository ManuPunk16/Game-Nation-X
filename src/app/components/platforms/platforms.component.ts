import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Platforms } from 'src/app/models/games.model';
@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css']
})
export class PlatformsComponent implements OnInit {

  public _platforms = Platforms.platforms;

  constructor (
    private _gamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.getGamesWithPlatformsCount();
  }

  getGamesWithPlatformsCount() {
    const platforms = Platforms.platforms;
    platforms.forEach(platform => {
      this._gamesService.getPlatformsCountByName(platform.plat)
        .subscribe(count => {
          platform.total = count;
          this._platforms.sort((a, b) => b.total - a.total).filter(plat => plat.total <= 0);
        });
    });
  }
}
