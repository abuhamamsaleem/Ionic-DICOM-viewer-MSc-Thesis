import { TestBed } from '@angular/core/testing';

import { PatientDisplayGuardGuard } from './patient-display-guard.guard';

describe('PatientDisplayGuardGuard', () => {
  let guard: PatientDisplayGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PatientDisplayGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
