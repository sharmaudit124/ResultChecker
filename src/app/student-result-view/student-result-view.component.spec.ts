import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResultViewComponent } from './student-result-view.component';

describe('StudentResultViewComponent', () => {
  let component: StudentResultViewComponent;
  let fixture: ComponentFixture<StudentResultViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentResultViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
