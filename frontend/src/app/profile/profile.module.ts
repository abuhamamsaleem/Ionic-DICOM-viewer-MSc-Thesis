import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FireUserModule,
  ChEmailModule,
  ChBaseModule,
  ChPasswordModule,
  PractitionerInfoModule,
  SettingsModule,
  SeUserModalModule,
  ToolbarModule,
  TranslateModule,
} from '@inclouded/ionic4-inclouded-lib';
import { ProfileComponent } from './profile.component';
import { ContainerModule } from '@inclouded/ionic4-inclouded-lib';
import { IonicModule } from '@ionic/angular';
import { TranslatePipe } from '../_shared/translate/translate.pipe';
import { ChPasswordComponent } from './lazies/ch-password/ch-password.component';
import { ChEmailComponent } from './lazies/ch-email/ch-email.component';

@NgModule({
  declarations: [ProfileComponent, ChEmailComponent, ChPasswordComponent],
  imports: [
    CommonModule,
    FireUserModule,
    ChPasswordModule,
    ChEmailModule,
    ChBaseModule,
    PractitionerInfoModule,
    SettingsModule,
    SeUserModalModule,
    ContainerModule,
    IonicModule,
    ToolbarModule,
    TranslateModule,
  ],
})
export class ProfileModule {}
