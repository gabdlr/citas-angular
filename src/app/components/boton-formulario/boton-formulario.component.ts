import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton-formulario',
  templateUrl: './boton-formulario.component.html',
  styleUrls: ['./boton-formulario.component.css'],
})
export class BotonFormularioComponent {
  @Input() texto = '';
  @Input() clases = '';
}
