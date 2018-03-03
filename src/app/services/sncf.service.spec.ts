import { TestBed, inject } from '@angular/core/testing';

import { SncfService } from './sncf.service';

describe('SncfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SncfService]
    });
  });

  it('should be created', inject([SncfService], (service: SncfService) => {
    expect(service).toBeTruthy();
  }));
});
