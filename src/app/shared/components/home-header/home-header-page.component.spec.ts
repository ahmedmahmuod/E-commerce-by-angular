import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeaderPageComponent } from './home-header-page.component';

describe('HomeHeaderPageComponent', () => {
  let component: HomeHeaderPageComponent;
  let fixture: ComponentFixture<HomeHeaderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHeaderPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHeaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
