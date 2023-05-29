import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Developers } from 'src/app/models/games.model';
import { DevelopersEditorsService } from 'src/app/services/developers-editors.service';

@Component({
  selector: 'app-create-developers',
  templateUrl: './create-developers.component.html',
  styleUrls: ['./create-developers.component.css']
})
export class CreateDevelopersComponent implements OnInit {

  developerForm: FormGroup;
  submitted = false;
  public devs: Developers = new Developers();

  constructor(
    public _dialog: MatDialogRef<CreateDevelopersComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private _devEditorServices: DevelopersEditorsService
  ) {
    this.developerForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

  }

  submitForm(){
    // console.log(this.developerForm.value);
    if (this.developerForm.valid) {
      this._devEditorServices.createDeveloper(this.developerForm.value).then(() => {
        this.submitted = true;
      });
    } else {
      console.log("No es valido");
    }
  }

  newDev(): void {
    this.submitted = false;
    this.devs = new Developers();
  }
}
