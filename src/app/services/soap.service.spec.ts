import { TestBed, inject } from '@angular/core/testing';

import { SoapService } from './soap.service';

describe('SoapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoapService]
    });
  });

  it('should be created', inject([SoapService], (service: SoapService) => {
    expect(service).toBeTruthy();
  }));
});
