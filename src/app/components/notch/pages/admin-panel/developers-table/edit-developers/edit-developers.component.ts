import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DevelopersEditorsService } from 'src/app/services/developers-editors.service';
import { Developers } from 'src/app/models/games.model';

@Component({
  selector: 'app-edit-developers',
  templateUrl: './edit-developers.component.html',
  styleUrls: ['./edit-developers.component.css']
})
export class EditDevelopersComponent implements OnInit {

  public developers!: Developers;
  message = '';

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _devs: DevelopersEditorsService
  ) {

  }

  ngOnInit(): void {
    this.developers = this.data;
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
  }

  onDeveloperEdit() {
    if (this.developers.id) {
      this._devs.updateDeveloper(this.developers.id, this.data)
      .then(() => { this.message = 'Se ha sido actualizado!';
      })
      .catch(err => console.log(err));
    }
  }
}
