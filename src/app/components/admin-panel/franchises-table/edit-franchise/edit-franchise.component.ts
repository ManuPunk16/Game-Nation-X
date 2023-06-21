import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DevelopersEditorsService } from 'src/app/services/developers-editors.service';
import { Franchise } from 'src/app/models/games.model';

@Component({
  selector: 'app-edit-franchise',
  templateUrl: './edit-franchise.component.html',
  styleUrls: ['./edit-franchise.component.css']
})
export class EditFranchiseComponent implements OnInit {

  public franchise!: Franchise;
  message = '';

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _devs: DevelopersEditorsService
  ) {

  }

  ngOnInit(): void {
    this.franchise = this.data;
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
  }

  onDeveloperEdit() {
    if (this.franchise.id) {
      this._devs.updateFranchise(this.franchise.id, this.data)
      .then(() => { this.message = 'Se ha sido actualizado!';
      })
      .catch(err => console.log(err));
    }
  }
}
