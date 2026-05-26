import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: false
})
export class App implements AfterViewInit {
  @ViewChild('sliderWrapper', { static: true }) sliderWrapper!: ElementRef;

  ngAfterViewInit(): void {

$(".dropdown-trigger").dropdown();
    let burger = document.getElementById("burger");

let heroImage = document.querySelector(".hero-image");
let showMenu = false;
let del = 7;
let i = 1;

let tl = gsap.timeline({
  repeat: -1,
  yoyo: true,
  ease: "expo.out"
});



gsap.set(["#hero-1 h2, #hero-1 h1, #hero-1 h3"], {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
});


gsap.set(
  [
    `#hero-2 h2, #hero-3 h2, 
     #hero-2 h1, #hero-3 h1, 
     #hero-2 h3, #hero-3 h3`
  ],
  {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
  }
);

while (i < 3) {
  tl.to(`#hero-${i} h2`, { duration: 0.9, clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", delay: del })
    .to(`#hero-${i} h1`, { duration: 0.9, clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, "-=0.3")
    .to(`#hero-${i} h3`, { duration: 0.9, clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, "-=0.3")
    .to(`#hero-${i} .hi-${i}`, { duration: 0.9, clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, "-=1")
    .to(`#hero-${i + 1} h2`, { duration: 0.9, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" })
    .to(`#hero-${i + 1} h1`, { duration: 0.9, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, "-=0.3")
    .to(`#hero-${i + 1} h3`, { duration: 0.9, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, "-=0.3");

  i++;
}

  }     
  

}

