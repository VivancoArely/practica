import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Iecologico } from './iecologico';

describe('Iecologico', () => {
  let component: Iecologico;
  let fixture: ComponentFixture<Iecologico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Iecologico],
    }).compileComponents();

    fixture = TestBed.createComponent(Iecologico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
