import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'game-details/:id', component: GameDetailComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class DetailRoutingModule { }
