import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PatientsStateManagementService } from '../_services/patients-state-management.service';

@Injectable({
  providedIn: 'root',
})
export class PatientDisplayGuardGuard implements CanActivate {
  data = [];

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.data.length === 0) {
      return false;
    } else {
      return true;
    }
  }
  constructor(private patientStateManagement: PatientsStateManagementService) {
    this.patientStateManagement.patients.subscribe(
      (data) => (this.data = data)
    );
  }
}
