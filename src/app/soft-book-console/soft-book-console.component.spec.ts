import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftBookConsoleComponent } from './soft-book-console.component';

describe('SoftBookConsoleComponent', () => {
  let component: SoftBookConsoleComponent;
  let fixture: ComponentFixture<SoftBookConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftBookConsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftBookConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
