import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './components/header/app';
import { Nav } from './components/nav/nav';
import { CalculadoraComponent } from './components/calculadora/calculadora';
import { Formulario } from './components/formulario/formulario';
import { Lista } from './components/lista/lista';
import { Iecologico } from './components/iecologico/iecologico';

import { Cards } from './components/cards/cards';
import { Footer } from './components/footer/footer';
import { Nosotros } from './components/nosotros/nosotros';
import { Mision } from './components/mision/mision';
import { Historia } from './components/historia/historia';

@NgModule({
  declarations: [App, Nav, Lista, Iecologico, Cards, Footer, Nosotros, Mision, Historia],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
