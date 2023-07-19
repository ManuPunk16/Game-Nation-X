import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/auth.guard';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: AdminPanelComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class AdminRoutingModule { }
