import { TestBed } from '@angular/core/testing';

import { RecuperaService } from './recupera.service';

describe('RecuperaService', () => {
  let service: RecuperaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
