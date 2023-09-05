import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetailRoutingModule } from './detail-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { EditReviewComponent } from './pages/game-detail/edit-review/edit-review.component';
// import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    GameDetailComponent,
    EditReviewComponent,
    // LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DetailRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatOptionModule,
    MatButtonModule,
    FlexLayoutModule,
    YouTubePlayerModule,
    MatListModule,
    MatIconModule
  ]
})
export class DetailModule { }
