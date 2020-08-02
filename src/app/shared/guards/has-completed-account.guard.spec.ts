import { TestBed } from '@angular/core/testing';

import { HasCompletedAccountGuard } from './has-completed-account.guard';

describe('HasCompletedAccountGuard', () => {
  let guard: HasCompletedAccountGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasCompletedAccountGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
