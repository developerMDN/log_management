import { TestBed } from '@angular/core/testing';

import { FiltrosFechaService } from './filtros-fecha.service';

describe('FiltrosFechaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiltrosFechaService = TestBed.get(FiltrosFechaService);
    expect(service).toBeTruthy();
  });
});
