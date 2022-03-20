import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticahrtComponent } from './multicahrt.component';

describe('MulticahrtComponent', () => {
  let component: MulticahrtComponent;
  let fixture: ComponentFixture<MulticahrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MulticahrtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticahrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
