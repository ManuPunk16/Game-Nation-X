import { Component, OnInit, ViewChild } from '@angular/core';
import { DevelopersEditorsService } from 'src/app/services/developers-editors.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Editors } from 'src/app/models/games.model';
import { map, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditEditorsComponent } from './edit-editors/edit-editors.component';
import { CreateEditorsComponent } from './create-editors/create-editors.component';

@Component({
  selector: 'app-editors-table',
  templateUrl: './editors-table.component.html',
  styleUrls: ['./editors-table.component.css']
})
export class EditorsTableComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  public editors: Editors[] = [];

  public dataSourceEditors!: MatTableDataSource<Editors>;
  public displayedColumnEditors: string[] = ['actions', 'name'];

  constructor(
    private _devs: DevelopersEditorsService,
    public _dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getAllEditors();
  }

  getAllEditors(): void {
    this._devs.getAllEditors().snapshotChanges().pipe(
      take(1),
      map(changes =>
        changes.map(c =>
          ({ ...c.payload.doc.data(), id: c.payload.doc.id })
        )
      )
    ).subscribe(data => {
      this.editors = data;
      this.dataSourceEditors = new MatTableDataSource(this.editors);
      this.dataSourceEditors.paginator = this.paginator;
      // console.log(this.editors);
    });
  }

  onEditorsformDialogCreate(): void {
    const platformDialog = this._dialog.open(CreateEditorsComponent, {
      width: '50%'
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }

  onEditorsformDialogEdit(row: any): void {
    const platformDialog = this._dialog.open(EditEditorsComponent, {
      width: '50%',
      data: row
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }
}
