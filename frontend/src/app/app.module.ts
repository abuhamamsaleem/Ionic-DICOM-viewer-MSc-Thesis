import { APP_INITIALIZER, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import {
  ContainerModule,
  LoginModule,
  SettingsModule,
  setupTranslateFactory,
  ToolbarModule,
  TranslateModule,
  TranslateService,
} from '@inclouded/ionic4-inclouded-lib';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { ProfileModule } from './profile/profile.module';
import { PatientDisplayComponent } from './patient-display/patient-display.component';
import { StudyDisplayComponent } from './study-display/study-display.component';
import { InstanceDisplayComponent } from './instance-display/instance-display.component';
import { ModalPopupPage } from './modal-popup/modal-popup.page';
import { SettingsComponent } from './settings/settings.component';
import { ThemeService } from './_services/theme.service';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PatientDisplayComponent,
    StudyDisplayComponent,
    InstanceDisplayComponent,
    ModalPopupPage,
    SettingsComponent,
    ViewerComponent,
  ],
  entryComponents: [ModalPopupPage],
  imports: [
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    ProfileModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    ToolbarModule,
    ContainerModule,
    TranslateModule,
    SettingsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseAuthentication,
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true,
    },
    ThemeService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
