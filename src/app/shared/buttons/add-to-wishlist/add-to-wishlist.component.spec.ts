import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToWishlistComponent } from './add-to-wishlist.component';

describe('AddToWishlistComponent', () => {
  let component: AddToWishlistComponent;
  let fixture: ComponentFixture<AddToWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToWishlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
