import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelmetDetailsComponent } from './helmet-details.component';

describe('HelmetDetailsComponent', () => {
  let component: HelmetDetailsComponent;
  let fixture: ComponentFixture<HelmetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelmetDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelmetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
