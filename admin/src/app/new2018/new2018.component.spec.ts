import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { New2018Component } from './new2018.component';

describe('New2018Component', () => {
  let component: New2018Component;
  let fixture: ComponentFixture<New2018Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ New2018Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(New2018Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
