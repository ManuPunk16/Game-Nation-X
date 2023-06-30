import { Component, OnInit, ViewChild } from '@angular/core';
import { PlatformsService } from 'src/app/services/platforms.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Platform } from 'src/app/models/games.model';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditPlatformComponent } from '../../add-game/edit-platform/edit-platform.component';
import { CreatePlatformComponent } from '../../add-game/create-platform/create-platform.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-platforms-table',
  templateUrl: './platforms-table.component.html',
  styleUrls: ['./platforms-table.component.css']
})
export class PlatformsTableComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  public platforms: Platform[] = [];
  public dataSourcePlatform!: MatTableDataSource<Platform>;
  public displayedColumnPlatforms: string[] = ['actions', 'name'];

  constructor(
    public _dialog: MatDialog,
    private _platformService: PlatformsService,
    private _liveAnnouncer: LiveAnnouncer
  ) {

  }

  ngOnInit(): void {
    this.getAllPlatforms();
  }

  getAllPlatforms(): void {
    this._platformService.getAllPlatforms().snapshotChanges().pipe(

      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data ()})
        )
      )
    ).subscribe(data => {
      this.platforms = data;
      this.dataSourcePlatform = new MatTableDataSource(this.platforms);
      this.dataSourcePlatform.paginator = this.paginator;
      this.dataSourcePlatform.sort = this.sort;
      // console.log(this.platforms);
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onPlatformDialogCreate(): void {
    const platformDialog = this._dialog.open(CreatePlatformComponent, {
      width: '50%'
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }

  onPlatformDialogEdit(row: any): void {
    const platformDialog = this._dialog.open(EditPlatformComponent, {
      width: '50%',
      data: row
    });

    platformDialog.afterClosed().subscribe(res => {

    });
  }

}
