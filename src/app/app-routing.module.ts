import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LatestUpdatesComponent } from './components/latest-updates/latest-updates.component';
import { LatestUploadsComponent } from './components/latest-uploads/latest-uploads.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { CategoryComponent } from './components/categories/category/category.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'game-datails/:id', component: GameDetailComponent },
  { path: 'category/:name', component: CategoryComponent },
  { path: 'latest-updates', component: LatestUpdatesComponent },
  { path: 'latest-uploads', component: LatestUploadsComponent },
  { path: 'platforms', component: PlatformsComponent },
  { path: 'dashboard', component: AdminPanelComponent }, //protect
  { path: 'dashboard/add-game', component: AddGameComponent }, //protect
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
