import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { Footer } from '../footer/footer';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Footer],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export class Formulario {
  formulario: FormGroup;

  // Inyectamos el FormBuilder para armar el formulario más fácil
  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],

      //telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      comentarios: [''],
      avisop:[false, Validators.requiredTrue]
      
    });
  }

  async guardarDatos() {

    if (this.formulario.invalid) {
      alert('Por favor revisa que los campos requeridos estén correctamente llenados.');
      return;
    }

    try {
      await addDoc(collection(db, 'contactos'), {
        nombre: this.formulario.value.nombre,
        //telefono: this.formulario.value.telefono,
        email: this.formulario.value.email,
        comentarios: this.formulario.value.comentarios,
          avisop:this.formulario.value.avisop,
        fechaCreacion: new Date()
      });

      alert('Tus datos han sido guardados correctamente, pronto nos pondremos en contacto contigo');

      this.formulario.reset();

    } catch (error) {
      console.error("Error al guardar el formulario: ", error);
      alert('Ocurri{o un problema al enviar los datos, intentalo mas tarde}.');
    }
  }
 
}
