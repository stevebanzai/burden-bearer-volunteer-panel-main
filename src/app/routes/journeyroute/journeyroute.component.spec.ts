import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyrouteComponent } from './journeyroute.component';

describe('JourneyrouteComponent', () => {
  let component: JourneyrouteComponent;
  let fixture: ComponentFixture<JourneyrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneyrouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
