import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { App } from './components/header/app';
import{  Formulario} from './components/formulario/formulario'
import { Nav } from './components/nav/nav';
import {Calculadora} from './components/calculadora/calculadora';
import { Iecologico } from './components/iecologico/iecologico';
import { Nosotros } from './components/nosotros/nosotros';



const routes: Routes = [
   { path: '', redirectTo: '/inicio', pathMatch: 'full' },
   { path: 'inicio', component: Nav },
   {path: 'formulario',component:Formulario},
   {path: 'calculadora', component: Calculadora},
   {path: 'iecologico', component: Iecologico},
   {path: 'nosotros', component:Nosotros}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
