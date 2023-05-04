import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlatformsService } from 'src/app/services/platforms.service';

@Component({
  selector: 'app-create-platform',
  templateUrl: './create-platform.component.html',
  styleUrls: ['./create-platform.component.css']
})
export class CreatePlatformComponent implements OnInit{

  platformForm: FormGroup;
  submitted = false;

  constructor (
    public _dialog: MatDialogRef<CreatePlatformComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private _platformService: PlatformsService
  ) {
    this.platformForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

  }

  submitForm(){
    console.log(this.platformForm.value);
    if (this.platformForm.valid) {
      this._platformService.createPlatform(this.platformForm.value).then(() => {
        this.submitted = true;
      });
    } else {
      console.log("No es valido");
    }
  }

}
