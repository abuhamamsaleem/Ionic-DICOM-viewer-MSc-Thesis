import { TestBed } from '@angular/core/testing';

import { PatientsStateManagementService } from './patients-state-management.service';

describe('PatientsStateManagementService', () => {
  let service: PatientsStateManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsStateManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
