import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDialog } from './register.dialog';

describe('RegisterDialog', () => {
  let component: RegisterDialog;
  let fixture: ComponentFixture<RegisterDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
