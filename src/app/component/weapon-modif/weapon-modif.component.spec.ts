import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponModifComponent } from './weapon-modif.component';

describe('WeaponModifComponent', () => {
  let component: WeaponModifComponent;
  let fixture: ComponentFixture<WeaponModifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponModifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaponModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
