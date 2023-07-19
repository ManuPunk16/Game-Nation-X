import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editors } from 'src/app/models/games.model';
import { DevelopersEditorsService } from 'src/app/services/developers-editors.service';

@Component({
  selector: 'app-create-editors',
  templateUrl: './create-editors.component.html',
  styleUrls: ['./create-editors.component.css']
})
export class CreateEditorsComponent implements OnInit {

  editorsForm: FormGroup;
  submitted = false;
  public editors: Editors = new Editors();

  constructor(
    public _dialog: MatDialogRef<CreateEditorsComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private _devEditorServices: DevelopersEditorsService
  ) {
    this.editorsForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

  }

  submitForm(){
    // console.log(this.developerForm.value);
    if (this.editorsForm.valid) {
      this._devEditorServices.createEditor(this.editorsForm.value).then(() => {
        this.submitted = true;
      });
    } else {
      console.log("No es valido");
    }
  }

  newDev(): void {
    this.submitted = false;
    this.editors = new Editors();
  }
}
