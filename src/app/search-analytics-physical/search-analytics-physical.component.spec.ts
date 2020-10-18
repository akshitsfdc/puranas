import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAnalyticsPhysicalComponent } from './search-analytics-physical.component';

describe('SearchAnalyticsPhysicalComponent', () => {
  let component: SearchAnalyticsPhysicalComponent;
  let fixture: ComponentFixture<SearchAnalyticsPhysicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAnalyticsPhysicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAnalyticsPhysicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
