import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDevelopersComponent } from './edit-developers.component';

describe('EditDevelopersComponent', () => {
  let component: EditDevelopersComponent;
  let fixture: ComponentFixture<EditDevelopersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDevelopersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
