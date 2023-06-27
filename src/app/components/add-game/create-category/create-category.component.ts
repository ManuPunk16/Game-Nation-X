import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  submitted = false;

  constructor (
    public _dialog: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private _categoryService: CategoriesService
  ) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

  }

  submitForm(){
    // console.log(this.categoryForm.value);
    if (this.categoryForm.valid) {
      this._categoryService.createCategory(this.categoryForm.value).then(() => {
        this.submitted = true;
      });
    } else {
      console.log("No es valido");
    }
  }

}
