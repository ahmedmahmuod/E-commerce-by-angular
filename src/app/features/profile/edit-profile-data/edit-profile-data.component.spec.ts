import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileDataComponent } from './edit-profile-data.component';

describe('EditProfileDataComponent', () => {
  let component: EditProfileDataComponent;
  let fixture: ComponentFixture<EditProfileDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
