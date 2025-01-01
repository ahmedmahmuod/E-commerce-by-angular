import { TestBed } from '@angular/core/testing';

import { SubcategoriesService } from './subcategories.service';

describe('SubcategoriesService', () => {
  let service: SubcategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
