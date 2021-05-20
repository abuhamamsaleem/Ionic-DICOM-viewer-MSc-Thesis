import { Component, OnInit } from '@angular/core';
import { ToastService, AlertService } from '@inclouded/ionic4-inclouded-lib';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ch-password',
  templateUrl: './ch-password.component.html',
  styleUrls: ['./ch-password.component.scss'],
})
export class ChPasswordComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {}

  onCallSave(event: string) {
    if (event) {
      this.authService
        .newPassword(event)
        .then(() => {
          this.toastService.presentToast('PASSWORD_CHANGE_SUCCESS');
          this.router.navigate(['profile']);
        })
        .catch(() => {
          this.alertService.presentError('UPDATE_UNSUCCESSFULL');
        });
    }
  }
}
