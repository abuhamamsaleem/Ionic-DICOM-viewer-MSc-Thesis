import { Component, OnInit } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../_services/authentication.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ToastService,
  LoginConfig,
  AssociativeArray,
} from '@inclouded/ionic4-inclouded-lib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginConfig: LoginConfig = {
    title: 'Lib portál',
    version: 'v' + environment.version,
    versionLink: 'https://www.google.hu/',
  };
  alertMessage: string;
  routeTo: string;
  alertsList: AssociativeArray = {
    user: () => 'WRONG_EMAIL_PW',
    server: () => 'SERVICE',
    false: () => '',
  };

  constructor(
    private authService: AuthenticationService,
    private storage: Storage,
    private navController: NavController,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.logout();
    this.routeTo = this.route.snapshot.params.routeTo
      ? this.route.snapshot.params.routeTo
      : '/';
  }

  onCallLogin(event: {
    email: string;
    password: string;
    isRememberMe: boolean;
  }) {
    this.authService
      .login(event.email, event.password, event.isRememberMe)
      .then(
        (result) => {
          if (result && result.user) {
            this.storage.set('user', {
              displayName: result.user.displayName,
              email: result.user.email,
              uid: result.user.uid,
              lastSignInTime: result.user.metadata.lastSignInTime,
            });
            console.log(result);
            this.navController.navigateRoot('/home');
            // this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.alertMessage =
            error.code === 'auth/user-not-found' ||
            error.code === 'auth/wrong-password'
              ? this.alertsList.user()
              : this.alertsList.server();
        }
      );
  }

  onCallPasswordReminder(event: string) {
    this.authService
      .passwordRemind(event)
      .then(() => {
        this.toastService.presentToast('PASSWORD_CHANGE_MESSAGE');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          this.toastService.presentToast('WRONG_EMAIL');
        }
      });
  }
}
