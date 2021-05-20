import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { AlertService, ToastService } from '@inclouded/ionic4-inclouded-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ch-email',
  templateUrl: './ch-email.component.html',
  styleUrls: ['./ch-email.component.scss'],
})
export class ChEmailComponent implements OnInit {
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
        .newEmail(event)
        .then(() => {
          this.toastService.presentToast('EMAIL_CHANGE_SUCCESS');
          this.router.navigateByUrl('/personal-info');
        })
        .catch(() => {
          this.alertService.presentError('UPDATE_UNSUCCESSFULL');
        });
    }
  }
}
