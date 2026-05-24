import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './components/header/app';
import { Nav } from './components/nav/nav';
import { Calculadora } from './components/calculadora/calculadora';
import { Formulario } from './components/formulario/formulario';
import { Lista } from './components/lista/lista';

@NgModule({
  declarations: [App, Nav, Lista],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App,],
})
export class AppModule {}
