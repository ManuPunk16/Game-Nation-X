import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesclimerComponent } from './desclimer.component';

describe('DesclimerComponent', () => {
  let component: DesclimerComponent;
  let fixture: ComponentFixture<DesclimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesclimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesclimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
