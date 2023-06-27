import { Component, OnInit, ViewChild } from '@angular/core';
import { DevelopersEditorsService } from 'src/app/services/developers-editors.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Developers } from 'src/app/models/games.model';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditDevelopersComponent } from './edit-developers/edit-developers.component';
import { CreateDevelopersComponent } from './create-developers/create-developers.component';

@Component({
  selector: 'app-developers-table',
  templateUrl: './developers-table.component.html',
  styleUrls: ['./developers-table.component.css']
})
export class DevelopersTableComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  public developers: Developers[] = [];

  public dataSourceDevelopers!: MatTableDataSource<Developers>;
  public displayedColumnDevelopers: string[] = ['actions', 'name'];

  constructor(
    private _devs: DevelopersEditorsService,
    public _dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getAllDevelopers();
  }

  getAllDevelopers(): void {
    this._devs.getAllDevelopers().snapshotChanges().pipe(

      map(changes =>
        changes.map(c =>
          ({ ...c.payload.doc.data(), id: c.payload.doc.id })
        )
      )
    ).subscribe(data => {
      this.developers = data;
      this.dataSourceDevelopers = new MatTableDataSource(this.developers);
      this.dataSourceDevelopers.paginator = this.paginator;
      // console.log(this.developers);
    });
  }


  onDeveloperDialogCreate(): void {
    const platformDialog = this._dialog.open(CreateDevelopersComponent, {
      width: '50%'
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }

  onDeveloperDialogEdit(row: any): void {
    const platformDialog = this._dialog.open(EditDevelopersComponent, {
      width: '50%',
      data: row
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }
}
