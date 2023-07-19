import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorsTableComponent } from './editors-table.component';

describe('EditorsTableComponent', () => {
  let component: EditorsTableComponent;
  let fixture: ComponentFixture<EditorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
