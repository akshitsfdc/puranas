import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDisplayCollectionComponent } from './add-update-display-collection.component';

describe('AddUpdateDisplayCollectionComponent', () => {
  let component: AddUpdateDisplayCollectionComponent;
  let fixture: ComponentFixture<AddUpdateDisplayCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateDisplayCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateDisplayCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
