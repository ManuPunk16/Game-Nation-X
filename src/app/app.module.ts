import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChunkPipe } from './pipes/chunk.pipe';
import { NgxEditorModule } from 'ngx-editor';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceTsService } from './services/auth.service.ts.service';
import { NgxPaginationModule } from 'ngx-pagination';

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
import { MatSidenavModule } from '@angular/material/sidenav';

import localePy from '@angular/common/locales/es';
// import { LOCALE_ID } from '@angular/core';
import { registerLocaleData, NgOptimizedImage } from '@angular/common';
registerLocaleData(localePy, 'es');

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
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AboutComponent } from './components/info-panel/about/about.component';
import { ContactComponent } from './components/info-panel/contact/contact.component';
import { EditReviewComponent } from './components/game-detail/edit-review/edit-review.component';
import { TermsConditionsComponent } from './components/info-panel/terms-conditions/terms-conditions.component';
import { DesclimerComponent } from './components/info-panel/desclimer/desclimer.component';
import { PrivacyPolicyComponent } from './components/info-panel/privacy-policy/privacy-policy.component';
import { SiteMapComponent } from './components/info-panel/site-map/site-map.component';
import { ServiceWorkerModule } from '@angular/service-worker';

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
    LoginComponent,
    ConfirmationDialogComponent,
    AboutComponent,
    ContactComponent,
    EditReviewComponent,
    TermsConditionsComponent,
    DesclimerComponent,
    PrivacyPolicyComponent,
    SiteMapComponent
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
    MatAutocompleteModule,
    MatSidenavModule,
    HttpClientModule,
    NgxPaginationModule,
    NgOptimizedImage,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    AuthServiceTsService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
