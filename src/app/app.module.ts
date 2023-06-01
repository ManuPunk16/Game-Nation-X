import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChunkPipe } from './pipes/chunk.pipe';
import { NgxEditorModule } from 'ngx-editor';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/enviroment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LatestUpdatesComponent } from './components/latest-updates/latest-updates.component';
import { LatestUploadsComponent } from './components/latest-uploads/latest-uploads.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { CreatePlatformComponent } from './components/add-game/create-platform/create-platform.component';
import { CreateCategoryComponent } from './components/add-game/create-category/create-category.component';
import { EditCategoryComponent } from './components/add-game/edit-category/edit-category.component';
import { EditPlatformComponent } from './components/add-game/edit-platform/edit-platform.component';
import { PlatformComponent } from './components/platforms/platform/platform.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';
import { UploadFormComponent } from './components/admin-panel/upload-form/upload-form.component';
import { UploadListComponent } from './components/admin-panel/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/admin-panel/upload-details/upload-details.component';
import { CategoriesTableComponent } from './components/admin-panel/categories-table/categories-table.component';
import { PlatformsTableComponent } from './components/admin-panel/platforms-table/platforms-table.component';
import { DevelopersTableComponent } from './components/admin-panel/developers-table/developers-table.component';
import { EditorsTableComponent } from './components/admin-panel/editors-table/editors-table.component';
import { FranchisesTableComponent } from './components/admin-panel/franchises-table/franchises-table.component';
import { EditFranchiseComponent } from './components/admin-panel/franchises-table/edit-franchise/edit-franchise.component';
import { CreateFranchiseComponent } from './components/admin-panel/franchises-table/create-franchise/create-franchise.component';
import { EditEditorsComponent } from './components/admin-panel/editors-table/edit-editors/edit-editors.component';
import { CreateEditorsComponent } from './components/admin-panel/editors-table/create-editors/create-editors.component';
import { EditDevelopersComponent } from './components/admin-panel/developers-table/edit-developers/edit-developers.component';
import { CreateDevelopersComponent } from './components/admin-panel/developers-table/create-developers/create-developers.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    FooterComponent,
    AddGameComponent,
    GameDetailComponent,
    AdminPanelComponent,
    LatestUpdatesComponent,
    LatestUploadsComponent,
    PlatformsComponent,
    CategoriesComponent,
    ChunkPipe,
    CategoryComponent,
    CreatePlatformComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    EditPlatformComponent,
    PlatformComponent,
    EditGameComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,
    CategoriesTableComponent,
    PlatformsTableComponent,
    DevelopersTableComponent,
    EditorsTableComponent,
    FranchisesTableComponent,
    EditFranchiseComponent,
    CreateFranchiseComponent,
    EditEditorsComponent,
    CreateEditorsComponent,
    EditDevelopersComponent,
    CreateDevelopersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CarouselModule,
    MatDialogModule,
    MatSelectModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatStepperModule,
    MatTabsModule,
    NgxEditorModule,
    MaterialFileInputModule,
    MatAutocompleteModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
