import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '@inclouded/ionic4-inclouded-lib';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import {
  PractitionerApi,
  FirestorePractitioner,
} from '@inclouded/fhir-practitioner';
import { IPractitioner } from '@ahryman40k/ts-fhir-types/lib/R4';

import { Storage } from '@ionic/storage';

import { PractitionerService } from '../_services/practitioner.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any;
  practitioner: IPractitioner;
  getPracSub: Subscription;
  role = 'sp';

  constructor(
    private pracService: PractitionerService,
    private authService: AuthenticationService,
    public storage: Storage,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getPractitioner().then((data) => console.log(data));
  }

  ngOnDestroy() {
    if (this.getPracSub) {
      this.getPracSub.unsubscribe();
    }
  }

  initPractitioner(): IPractitioner {
    return {
      id: this.user.uid,
      gender: null,
      name: [],
      telecom: [],
      qualification: [],
    } as IPractitioner;
  }

  async getPractitioner() {
    this.user = await this.storage.get('user');
    if (this.user) {
      this.getPracSub = this.pracService
        .getPractitionertById(this.user.uid)
        .subscribe((result: IPractitioner) => {
          this.practitioner = result ? result : this.initPractitioner();
        });
    }
  }

  updatePractitioner(pract: IPractitioner, updateName?: boolean) {
    this.pracService.update(pract).then(
      () => {
        if (updateName) {
          if (this.user) {
            this.user.displayName = pract.name[0].text;
            this.authService
              .updateCurrentUserName(this.user.displayName)
              .then(() => this.storage.set('user', this.user));
          }
        }
      },
      () => {
        this.alertService.presentError('UPDATE_UNSUCCESSFULL');
      }
    );
  }

  onCallUpdatePractitioner(event: {
    practitioner: IPractitioner;
    componentName: string;
  }) {
    this.updatePractitioner(event.practitioner, event.componentName === 'name');
    console.log('onCallUpdatePractitioner');
  }
}
