import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';

describe('Component: UserComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    });      // .compileComponents();  // If not using CLI or webpack
  })

  it('Should create the app', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })
});
