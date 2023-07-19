import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxEditorModule } from 'ngx-editor';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AddGameComponent } from './pages/add-game/add-game.component';
import { EditGameComponent } from './pages/edit-game/edit-game.component';
import { DevelopersTableComponent } from './pages/admin-panel/developers-table/developers-table.component';
import { EditorsTableComponent } from './pages/admin-panel/editors-table/editors-table.component';
import { FranchisesTableComponent } from './pages/admin-panel/franchises-table/franchises-table.component';
import { EditFranchiseComponent } from './pages/admin-panel/franchises-table/edit-franchise/edit-franchise.component';
import { CreateFranchiseComponent } from './pages/admin-panel/franchises-table/create-franchise/create-franchise.component';
import { EditEditorsComponent } from './pages/admin-panel/editors-table/edit-editors/edit-editors.component';
import { CreateEditorsComponent } from './pages/admin-panel/editors-table/create-editors/create-editors.component';
import { EditDevelopersComponent } from './pages/admin-panel/developers-table/edit-developers/edit-developers.component';
import { CreateDevelopersComponent } from './pages/admin-panel/developers-table/create-developers/create-developers.component';
import { ConfirmationDialogComponent } from './pages/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AddGameComponent,
    EditGameComponent,
    DevelopersTableComponent,
    EditorsTableComponent,
    FranchisesTableComponent,
    EditFranchiseComponent,
    CreateFranchiseComponent,
    EditEditorsComponent,
    CreateEditorsComponent,
    EditDevelopersComponent,
    CreateDevelopersComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    NgxEditorModule,
    MatTableModule,
    MatInputModule,
    MatStepperModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSnackBarModule,
    FlexLayoutModule
  ]
})
export class AdminModule { }
