import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardItemUpdateComponent } from './hard-item-update.component';

describe('HardItemUpdateComponent', () => {
  let component: HardItemUpdateComponent;
  let fixture: ComponentFixture<HardItemUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardItemUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardItemUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
