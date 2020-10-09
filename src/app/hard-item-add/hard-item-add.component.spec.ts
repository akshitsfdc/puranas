import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardItemAddComponent } from './hard-item-add.component';

describe('HardItemAddComponent', () => {
  let component: HardItemAddComponent;
  let fixture: ComponentFixture<HardItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardItemAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
