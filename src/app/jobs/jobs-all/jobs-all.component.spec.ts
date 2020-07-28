import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsAllComponent } from './jobs-all.component';

describe('JobsAllComponent', () => {
  let component: JobsAllComponent;
  let fixture: ComponentFixture<JobsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
