import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PatientDisplayComponent } from './patient-display/patient-display.component';
import { PatientDisplayGuardGuard } from './_guards/patient-display-guard.guard';
import { StudyDisplayComponent } from './study-display/study-display.component';
import { InstanceDisplayComponent } from './instance-display/instance-display.component';
import { AuthGuard } from './_guards/auth.guard';
import { ChEmailComponent } from './profile/lazies/ch-email/ch-email.component';
import { ChPasswordComponent } from './profile/lazies/ch-password/ch-password.component';
import { SettingsComponent } from './settings/settings.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ch-email',
    component: ChEmailComponent,
    // loadChildren: './profile/lazies/ch-email/ch-email.module#ChEmailPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'ch-password',
    component: ChPasswordComponent,
    // loadChildren: './profile/lazies/ch-password/ch-password.module#ChPasswordPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'patient-display',
    component: PatientDisplayComponent,
    canActivate: [PatientDisplayGuardGuard],
  },
  {
    path: 'studies/:id',
    component: StudyDisplayComponent,
    canActivate: [PatientDisplayGuardGuard],
  },
  {
    path: 'instances/:id',
    component: InstanceDisplayComponent,
    // canActivate: [PatientDisplayGuardGuard],
  },
  {
    path: 'image-modal',
    loadChildren: () =>
      import('./image-modal/image-modal.module').then(
        (m) => m.ImageModalPageModule
      ),
  },
  {
    path: 'modal-popup',
    loadChildren: () =>
      import('./modal-popup/modal-popup.module').then(
        (m) => m.ModalPopupPageModule
      ),
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'viewer/:index',
    component: ViewerComponent,
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
