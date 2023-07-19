import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisesTableComponent } from './franchises-table.component';

describe('FranchisesTableComponent', () => {
  let component: FranchisesTableComponent;
  let fixture: ComponentFixture<FranchisesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranchisesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchisesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
