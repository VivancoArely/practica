import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowGrid } from './flow-grid';

describe('FlowGrid', () => {
  let component: FlowGrid;
  let fixture: ComponentFixture<FlowGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
