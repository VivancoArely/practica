import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-iecologico',
  standalone: false,
  templateUrl: './iecologico.html',
  styleUrl: './iecologico.scss',
})
export class Iecologico implements AfterViewInit {
  ngAfterViewInit(): void {
   const section = document.querySelector<HTMLElement>('.counters');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(section);
        this.startCounters();
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
  }

  private startCounters() {
    const counters = document.querySelectorAll<HTMLElement>('.counter');
    const duration = 2000; // duración total en ms — aumenta para más lento
    const steps = 60;      // frames de la animación
    const interval = duration / steps;

    counters.forEach(counter => {
      const target = +(counter.getAttribute('data-target') ?? '0');
      const inc = Math.ceil(target / steps);
      let count = 0;

      const updateCount = () => {
        count = Math.min(count + inc, target);
        counter.innerText = String(count);
        if (count < target) setTimeout(updateCount, interval);
      };

      updateCount();
    });
  }

}

