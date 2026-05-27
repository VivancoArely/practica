import { TestBed } from '@angular/core/testing';
import { CalculadoraComponent } from './calculadora';

describe('CalculadoraComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CalculadoraComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(CalculadoraComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, ecociclo');
  });
});
