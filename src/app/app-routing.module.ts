import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LatestUpdatesComponent } from './components/latest-updates/latest-updates.component';
import { LatestUploadsComponent } from './components/latest-uploads/latest-uploads.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { PlatformComponent } from './components/platforms/platform/platform.component';
import { LoginComponent } from './components/details/pages/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'sitemap_index.xml', redirectTo: '/sitemap_index.xml', pathMatch: 'full' },
  { path: 'sitemap.xml', redirectTo: '/sitemap.xml', pathMatch: 'full' },
  { path: 'sitemap1.xml', redirectTo: '/sitemap1.xml', pathMatch: 'full' },
  { path: 'sitemap2.xml', redirectTo: '/sitemap2.xml', pathMatch: 'full' },
  {
    path: 'info',
    loadChildren: () => import('./components/info-panel/info.module').then( m => m.InfoModule )
  },
  {
    path: 'details',
    loadChildren: () => import('./components/details/detail.module').then( m => m.DetailModule )
  },
  { path: 'category/:name', component: CategoryComponent },
  { path: 'platform/:name', component: PlatformComponent },
  { path: 'latest-updates', component: LatestUpdatesComponent },
  { path: 'latest-uploads', component: LatestUploadsComponent },
  { path: 'platforms', component: PlatformsComponent },
  { path: 'login', component: LoginComponent},
  {
    path: 'notch',
    loadChildren: () => import('./components/notch/admin.module').then( m => m.AdminModule )
  },
  { path: '**', component: ErrorComponent }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  initialNavigation: 'enabledBlocking'
  // ...any other options you'd like to use
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
