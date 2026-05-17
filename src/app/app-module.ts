import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './components/header/app';
import { Nav } from './components/nav/nav';
import { Calculadora } from './components/calculadora/calculadora';
import { Formulario } from './components/formulario/formulario';

@NgModule({
  declarations: [App, Nav,],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [Nav, App,],
})
export class AppModule {}
