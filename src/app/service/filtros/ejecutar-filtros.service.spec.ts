import { TestBed } from '@angular/core/testing';

import { EjecutarFiltrosService } from './ejecutar-filtros.service';

describe('EjecutarFiltrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EjecutarFiltrosService = TestBed.get(EjecutarFiltrosService);
    expect(service).toBeTruthy();
  });
});
