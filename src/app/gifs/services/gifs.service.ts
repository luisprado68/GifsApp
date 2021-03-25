import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  //indica que sea un servicio de raiz para que sea global
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[] =[];
  private apiKey:string = 'v2dPt4x5ReOpRTRVpMomfbHCZKaxvepM';
  private servicioURL:string ='https://api.giphy.com/v1/gifs';
  public resultados:Gif[] =[];
  get historial(){
    //lo retorno como nuevo array 
    return [...this._historial];

  }

  constructor(private http:HttpClient){
    //validamos que no traiga nulo
    // if(localStorage.getItem('historial')){
      //como ya estamos validando aun nos da el error de que puede trar indefinido por eso agregamos ! para 
      //obligar la respuesta va a ser un objeto
      // this._historial = JSON.parse(localStorage.getItem('historial')!)
    // }
    //otra manera
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

   }
  buscarGifs(query:string){
    //lo ingresado lo pasamos a minuscula
    query = query.trim().toLowerCase();
    //validamos que no se repita la misma busqqueda si se repite es true
    if(!this._historial.includes(query)){
       //agregar al incio del array
      this._historial.unshift(query);
      //que solo muestr las 10 ultimas busquedas
      this._historial = this._historial.slice(0,10);
      console.log(this._historial);

      //guardamos los datos en el local storage
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    
    //params para acotar el url
    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',query);

    //espesificamos el tipo get es de tipo generico
    this.http.get<SearchGIFResponse>(`${this.servicioURL}/search?${params}`)
    //suscribe se ejecutara cuando tengamos la resolucion del get
    .subscribe((resp) =>{
        
        this.resultados = resp.data;
        //guardamos los datos en el local storage
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
    });
  }
}
