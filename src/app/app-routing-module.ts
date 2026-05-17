import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{  Formulario} from './components/formulario/formulario'


const routes: Routes = [
   { path: '', redirectTo: '/inicio', pathMatch: 'full' },
   
   {path: 'formulario',component:Formulario}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
