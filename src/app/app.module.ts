import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ListadoPacientesComponent } from './components/listado-pacientes/listado-pacientes.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { FormsModule } from '@angular/forms';
import { ErrorFormularioComponent } from './components/error-formulario/error-formulario.component';
import { BotonFormularioComponent } from './components/boton-formulario/boton-formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormularioComponent,
    ListadoPacientesComponent,
    PacienteComponent,
    ErrorFormularioComponent,
    BotonFormularioComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
