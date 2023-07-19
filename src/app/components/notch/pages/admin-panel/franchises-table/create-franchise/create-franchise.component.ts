import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Franchise } from 'src/app/models/games.model';
import { DevelopersEditorsService } from 'src/app/services/developers-editors.service';

@Component({
  selector: 'app-create-franchise',
  templateUrl: './create-franchise.component.html',
  styleUrls: ['./create-franchise.component.css']
})
export class CreateFranchiseComponent implements OnInit {

  franchiseForm: FormGroup;
  submitted = false;
  public franchise: Franchise = new Franchise();

  constructor(
    public _dialog: MatDialogRef<CreateFranchiseComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private _devEditorServices: DevelopersEditorsService
  ) {
    this.franchiseForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

  }

  submitForm(){
    // console.log(this.developerForm.value);
    if (this.franchiseForm.valid) {
      this._devEditorServices.createFranchise(this.franchiseForm.value).then(() => {
        this.submitted = true;
      });
    } else {
      console.log("No es valido");
    }
  }

  newDev(): void {
    this.submitted = false;
    this.franchise = new Franchise();
  }
}
