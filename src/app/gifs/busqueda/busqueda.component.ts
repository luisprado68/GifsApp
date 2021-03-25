import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //decorador se puede buscar por etiqueta por clase o por referencia local en este caso
  //y asigna el valor de la referencia local a txtBuscar
  //le indicamos el tipo elementRef es de tipo generico debemos especificar el tipo que debe traer en este caso input
  //agregamos ! para decir que el elemento que trae no es nullo
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  
  //para usar servicio debemos inyectarlo
  constructor(private gifService:GifsService){}

  
  buscar(){

    const valor = this.txtBuscar.nativeElement.value;

    //validamos que no tenga espacios
    if(valor.trim().length===0){return}
    //agregamos a la funcion el metod de busqueda
    this.gifService.buscarGifs(valor);
    //para que limpie una vez se presione enter
    this.txtBuscar.nativeElement.value = '';
  }

}
