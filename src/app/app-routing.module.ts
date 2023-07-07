import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LatestUpdatesComponent } from './components/latest-updates/latest-updates.component';
import { LatestUploadsComponent } from './components/latest-uploads/latest-uploads.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { PlatformComponent } from './components/platforms/platform/platform.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/info-panel/about/about.component';
import { ContactComponent } from './components/info-panel/contact/contact.component';
import { TermsConditionsComponent } from './components/info-panel/terms-conditions/terms-conditions.component';
import { DesclimerComponent } from './components/info-panel/desclimer/desclimer.component';
import { PrivacyPolicyComponent } from './components/info-panel/privacy-policy/privacy-policy.component';
import { SiteMapComponent } from './components/info-panel/site-map/site-map.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  // { path: 'add', component: AddGameComponent},
  { path: 'sitemap.xml', redirectTo: '/sitemap.xml', pathMatch: 'full' },
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'desclimer', component: DesclimerComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'site-map', component: SiteMapComponent },
  { path: 'game-details/:id', component: GameDetailComponent },
  { path: 'category/:name', component: CategoryComponent },
  { path: 'platform/:name', component: PlatformComponent },
  { path: 'latest-updates', component: LatestUpdatesComponent },
  { path: 'latest-uploads', component: LatestUploadsComponent },
  { path: 'platforms', component: PlatformsComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: AdminPanelComponent, canActivate: [AuthGuard] }, //protect
  { path: 'dashboard/add-game', component: AddGameComponent, canActivate: [AuthGuard] }, //protect
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
