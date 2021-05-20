import { Component, OnDestroy } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import { ApiService } from '../_services/api.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { PatientsStateManagementService } from '../_services/patients-state-management.service';
import { Subscription } from 'rxjs';
import { CFindQuery } from '../_model/queries/cFindQuery';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe],
})
export class HomePage implements OnDestroy {
  patients: any[] = [];

  patientName = '';
  patientId = '';
  accessionNumber = '';
  studyDescription = '';
  studyDate = '';

  cFindQuery: CFindQuery = {} as CFindQuery;

  date: string;

  subscription: Subscription;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private patientsStateManagement: PatientsStateManagementService,
    private datePipe: DatePipe,
    private menu: MenuController
  ) {
    console.log(window);
  }

  searchForPatient(name: string) {
    this.subscription = this.api.findPatientsByName(name).subscribe(
      (data) => {
        console.log(data);
        this.patientsStateManagement.setPatients(data);
        this.router.navigate(['patient-display'], {
          relativeTo: this.route.firstChild,
        });
      },
      (err) => {
        throw new Error('Error');
      }
    );
  }

  cFind(
    date: string,
    id: string,
    name: string,
    accessionNumber: string,
    description: string
  ) {
    try {
      const cFindQuery: CFindQuery = {} as CFindQuery;
      cFindQuery.StudyDescription = description;
      cFindQuery.PatientID = id;
      cFindQuery.PatientName = `*${name}*`;
      if (date === null || date === undefined || date === '') {
        cFindQuery.StudyDate = '*';
      } else {
        cFindQuery.StudyDate = this.datePipe.transform(date, 'yyyyMMdd');
      }
      cFindQuery.AccessionNumber = accessionNumber;
      console.log(cFindQuery);
      this.api.cFind(cFindQuery).subscribe((data) => {
        console.log(data);
        this.patients = data;
        this.patientsStateManagement.setPatients(data);
        this.router.navigate(['patient-display'], {
          relativeTo: this.route.firstChild,
        });
      });
    } catch (e) {
      throw e;
    }
  }

  clearForm() {
    this.patientName = '';
    this.patientId = '';
    this.accessionNumber = '';
    this.studyDescription = '';
    this.studyDate = '';
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
