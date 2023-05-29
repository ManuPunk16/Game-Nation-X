import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEditorsComponent } from './edit-editors.component';

describe('EditEditorsComponent', () => {
  let component: EditEditorsComponent;
  let fixture: ComponentFixture<EditEditorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEditorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
