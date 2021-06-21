import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagchatBoxComponent } from './flagchat-box.component';

describe('FlagchatBoxComponent', () => {
  let component: FlagchatBoxComponent;
  let fixture: ComponentFixture<FlagchatBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlagchatBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagchatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
