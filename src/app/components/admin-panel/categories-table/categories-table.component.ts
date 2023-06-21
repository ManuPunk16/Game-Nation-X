import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Category } from 'src/app/models/games.model';
import { map, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../../add-game/create-category/create-category.component';
import { EditCategoryComponent } from '../../add-game/edit-category/edit-category.component';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.css']
})
export class CategoriesTableComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  public categories: Category[] = [];
  public dataSourceCategories!: MatTableDataSource<Category>;
  public displayedColumnCategories: string[] = ['actions', 'name'];

  constructor(
    private _categoryService: CategoriesService,
    public _dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this._categoryService.getAllCategories().snapshotChanges().pipe(
      take(1),
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.categories = data;
      this.dataSourceCategories = new MatTableDataSource(this.categories);
      this.dataSourceCategories.paginator = this.paginator;
      this.dataSourceCategories.sort = this.sort;
      // console.log(this.categories);
    });
  }

  onCategoryDialogCreate(): void {
    const categoryDialog = this._dialog.open(CreateCategoryComponent, {
      width: '50%'
    });

    categoryDialog.afterClosed().subscribe(res => {

    });
  }

  onCategoryDialogEdit(row: any): void {
    const categoryDialog = this._dialog.open(EditCategoryComponent, {
      width: '50%',
      data: row
    });

    categoryDialog.afterClosed().subscribe(res => {

    });
  }

}
