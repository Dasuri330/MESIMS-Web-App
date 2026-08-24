import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentQueueComponent } from './enrollment-queue.component';

describe('EnrollmentQueueComponent', () => {
  let component: EnrollmentQueueComponent;
  let fixture: ComponentFixture<EnrollmentQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentQueueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentQueueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
