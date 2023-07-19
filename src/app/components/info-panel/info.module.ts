import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { InfoRoutingModule } from './info-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { DesclimerComponent } from './pages/desclimer/desclimer.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    TermsConditionsComponent,
    DesclimerComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    MatCardModule,
    MatDividerModule,
    RouterModule,
    FlexLayoutModule
  ]
})
export class InfoModule { }
