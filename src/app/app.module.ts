import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChunkPipe } from './pipes/chunk.pipe';
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
import { FooterComponent } from './components/footer/footer.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list'; //pesa mucho
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgOptimizedImage } from '@angular/common';

import { ErrorComponent } from './components/error/error.component';

import { LatestUpdatesComponent } from './components/latest-updates/latest-updates.component';
import { LatestUploadsComponent } from './components/latest-uploads/latest-uploads.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { PlatformComponent } from './components/platforms/platform/platform.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './components/details/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    FooterComponent,
    LatestUpdatesComponent,
    LatestUploadsComponent,
    PlatformsComponent,
    CategoriesComponent,
    ChunkPipe,
    CategoryComponent,
    PlatformComponent,
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
    MatCardModule,
    FlexLayoutModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatSlideToggleModule,
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
    }),
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    AuthServiceTsService, provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
