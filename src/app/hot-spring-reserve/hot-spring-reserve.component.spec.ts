import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotSpringReserveComponent } from './hot-spring-reserve.component';

describe('HotSpringReserveComponent', () => {
  let component: HotSpringReserveComponent;
  let fixture: ComponentFixture<HotSpringReserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotSpringReserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotSpringReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
