import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsMetricsComponent } from './reports-metrics.component';

describe('ReportsMetricsComponent', () => {
  let component: ReportsMetricsComponent;
  let fixture: ComponentFixture<ReportsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsMetricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
