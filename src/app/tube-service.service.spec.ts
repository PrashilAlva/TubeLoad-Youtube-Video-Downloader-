import { TestBed } from '@angular/core/testing';

import { TubeServiceService } from './tube-service.service';

describe('TubeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TubeServiceService = TestBed.get(TubeServiceService);
    expect(service).toBeTruthy();
  });
});
