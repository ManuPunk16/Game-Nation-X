import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditorsComponent } from './create-editors.component';

describe('CreateEditorsComponent', () => {
  let component: CreateEditorsComponent;
  let fixture: ComponentFixture<CreateEditorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
