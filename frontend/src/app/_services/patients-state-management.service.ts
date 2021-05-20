import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PatientsStateManagementService {
  private _patients: BehaviorSubject<any> = new BehaviorSubject([]);

  public readonly patients: Observable<any> = this._patients.asObservable();

  constructor(private apiService: ApiService) {}

  setPatients(patients: any[]) {
    this._patients.next(patients);
  }

  // fetchPatients(patientName: string) {
  //   this.apiService
  //     .findPatientsByName(patientName)
  //     .subscribe((data) => console.log(data));
  // }
}
