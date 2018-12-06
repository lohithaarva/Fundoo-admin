import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodersComponent } from './loders.component';

describe('LodersComponent', () => {
  let component: LodersComponent;
  let fixture: ComponentFixture<LodersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
