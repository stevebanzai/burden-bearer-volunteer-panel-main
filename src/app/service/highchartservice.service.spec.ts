import { TestBed } from '@angular/core/testing';

import { HighchartserviceService } from './highchartservice.service';

describe('HighchartserviceService', () => {
  let service: HighchartserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighchartserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
