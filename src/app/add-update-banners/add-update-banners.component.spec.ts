import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBannersComponent } from './add-update-banners.component';

describe('AddUpdateBannersComponent', () => {
  let component: AddUpdateBannersComponent;
  let fixture: ComponentFixture<AddUpdateBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateBannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
