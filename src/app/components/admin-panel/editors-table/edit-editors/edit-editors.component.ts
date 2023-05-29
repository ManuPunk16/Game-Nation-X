import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DevelopersEditorsService } from 'src/app/services/developers-editors.service';
import { Editors } from 'src/app/models/games.model';

@Component({
  selector: 'app-edit-editors',
  templateUrl: './edit-editors.component.html',
  styleUrls: ['./edit-editors.component.css']
})
export class EditEditorsComponent implements OnInit {

  public editors!: Editors;
  message = '';

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _devs: DevelopersEditorsService
  ) {

  }

  ngOnInit(): void {
    this.editors = this.data;
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
  }

  onDeveloperEdit() {
    if (this.editors.id) {
      this._devs.updateEditor(this.editors.id, this.data)
      .then(() => { this.message = 'Se ha sido actualizado!';
      })
      .catch(err => console.log(err));
    }
  }
}
