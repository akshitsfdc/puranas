import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftBookUpdateComponent } from './soft-book-update.component';

describe('SoftBookUpdateComponent', () => {
  let component: SoftBookUpdateComponent;
  let fixture: ComponentFixture<SoftBookUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftBookUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftBookUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
