import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeEntryListComponent } from './grade-entry-list.component';

describe('GradeEntryListComponent', () => {
  let component: GradeEntryListComponent;
  let fixture: ComponentFixture<GradeEntryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeEntryListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradeEntryListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
