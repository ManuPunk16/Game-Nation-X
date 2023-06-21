import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlatformsService } from 'src/app/services/platforms.service';
import { Platform } from 'src/app/models/games.model';

@Component({
  selector: 'app-edit-platform',
  templateUrl: './edit-platform.component.html',
  styleUrls: ['./edit-platform.component.css']
})
export class EditPlatformComponent implements OnInit {

  public platforms!: Platform;
  message = '';

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _platformService: PlatformsService
  ) {

  }

  ngOnInit(): void {
    this.platforms = this.data;
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
  }

  onPlatformEdit() {
    if (this.platforms.id) {
      this._platformService.updatePlatform(this.platforms.id, this.data)
      .then(() => { this.message = 'La categoria ha sido actualizada!';
      })
      .catch(err => console.log(err));
    }
  }

}
