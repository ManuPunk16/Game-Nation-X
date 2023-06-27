import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/games.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  public categories!: Category;
  message = '';

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoryService: CategoriesService
  ) {

  }

  ngOnInit(): void {
    this.categories = this.data;
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
  }

  onCategoryEdit() {
    if (this.categories.id) {
      this._categoryService.updateCategory(this.categories.id, this.data)
      .then(() => { this.message = 'La categoria ha sido actualizada!';
      })
      .catch(err => console.log(err));
    }
  }
}
