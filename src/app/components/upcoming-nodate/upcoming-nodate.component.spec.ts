import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingNodateComponent } from './upcoming-nodate.component';

describe('UpcomingNodateComponent', () => {
  let component: UpcomingNodateComponent;
  let fixture: ComponentFixture<UpcomingNodateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingNodateComponent]
    });
    fixture = TestBed.createComponent(UpcomingNodateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
