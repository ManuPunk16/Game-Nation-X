import { Component, OnInit, ViewChild } from '@angular/core';
import { DevelopersEditorsService } from 'src/app/services/developers-editors.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Developers, Editors, Franchise } from 'src/app/models/games.model';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateFranchiseComponent } from './create-franchise/create-franchise.component';
import { EditFranchiseComponent } from './edit-franchise/edit-franchise.component';

@Component({
  selector: 'app-franchises-table',
  templateUrl: './franchises-table.component.html',
  styleUrls: ['./franchises-table.component.css']
})
export class FranchisesTableComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  public franchises: Franchise[] = [];

  public dataSourceFranchises!: MatTableDataSource<Franchise>;
  public displayedColumnFranchises: string[] = ['actions', 'name'];

  constructor(
    private _devs: DevelopersEditorsService,
    public _dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getAllFranchises();
  }

  getAllFranchises(): void {
    this._devs.getAllFranchises().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ ...c.payload.doc.data(), id: c.payload.doc.id })
        )
      )
    ).subscribe(data => {
      this.franchises = data;
      this.dataSourceFranchises = new MatTableDataSource(this.franchises);
      this.dataSourceFranchises.paginator = this.paginator;
      // console.log(this.franchises);
    });
  }

  onFranchiseDialogCreate(): void {
    const platformDialog = this._dialog.open(CreateFranchiseComponent, {
      width: '50%'
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }

  onFranchiseDialogEdit(row: any): void {
    const platformDialog = this._dialog.open(EditFranchiseComponent, {
      width: '50%',
      data: row
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }
}
