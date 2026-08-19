import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountsComponent } from './admin-accounts.component';

describe('AdminAccountsComponent', () => {
  let component: AdminAccountsComponent;
  let fixture: ComponentFixture<AdminAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAccountsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAccountsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
