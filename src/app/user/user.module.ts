import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

// Components
import { BioComponent } from './bio/bio.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SigninDirective } from './signin.directive';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    BioComponent,
    UserPageComponent,
    SigninDirective,
    UpgradeComponent,
    SubscribeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
