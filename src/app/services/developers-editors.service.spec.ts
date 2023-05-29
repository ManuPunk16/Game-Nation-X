import { TestBed } from '@angular/core/testing';

import { DevelopersEditorsService } from './developers-editors.service';

describe('DevelopersEditorsService', () => {
  let service: DevelopersEditorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevelopersEditorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
