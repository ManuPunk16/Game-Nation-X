import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { DesclimerComponent } from './pages/desclimer/desclimer.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'sitemap.xml', redirectTo: '/sitemap.xml', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'terms-conditions', component: TermsConditionsComponent },
      { path: 'desclimer', component: DesclimerComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class InfoRoutingModule { }
