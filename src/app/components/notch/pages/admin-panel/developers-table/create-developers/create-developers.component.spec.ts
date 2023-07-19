import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDevelopersComponent } from './create-developers.component';

describe('CreateDevelopersComponent', () => {
  let component: CreateDevelopersComponent;
  let fixture: ComponentFixture<CreateDevelopersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDevelopersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
