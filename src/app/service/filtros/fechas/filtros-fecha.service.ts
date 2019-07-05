import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltrosFechaService {

  constructor() { }

  fechaIgualQue(fecha: string, campoNombre: string, datos: any[]) {

    const resultado = datos.filter(dt => {
      const dtime = new Date(Date.parse(dt[campoNombre]))
        .setHours(0, 0, 0, 0);
      return dtime === this.getDate(fecha).getTime();
    });

    return resultado || [];
  }

  fechaMenorQue(fecha: string, campoNombre: string, datos: any[]) {

    const resultado = datos.filter(dt => {
      const dtime = new Date(Date.parse(dt[campoNombre]))
        .setHours(0, 0, 0, 0);
      return dtime < this.getDate(fecha).getTime();
    });

    return resultado || [];
  }

  fechaMenorIgualQue(fecha: string, campoNombre: string, datos: any[]) {

    const resultado = datos.filter(dt => {
      const dtime = new Date(Date.parse(dt[campoNombre]))
        .setHours(0, 0, 0, 0);
      return dtime <= this.getDate(fecha).getTime();
    });

    return resultado || [];
  }

  fechaMayorQue(fecha: string, campoNombre: string, datos: any[]) {

    const resultado = datos.filter(dt => {
      const dtime = new Date(Date.parse(dt[campoNombre]))
        .setHours(0, 0, 0, 0);
      return dtime > this.getDate(fecha).getTime();
    });

    return resultado || [];
  }

  fechaMayorIgualQue(fecha: string, campoNombre: string, datos: any[]) {

    const resultado = datos.filter(dt => {
      const dtime = new Date(Date.parse(dt[campoNombre]))
        .setHours(0, 0, 0, 0);
      return dtime >= this.getDate(fecha).getTime();
    });

    return resultado || [];
  }

  fechaDiferenteDe(fecha: string, campoNombre: string, datos: any[]) {

    const resultado = datos.filter(dt => {
      const dtime = new Date(Date.parse(dt[campoNombre]))
        .setHours(0, 0, 0, 0);
      return dtime !== this.getDate(fecha).getTime();
    });

    return resultado || [];
  }

  private getDay = (fecha: string) => + (fecha.split('/')[0]);

  private getMonth = (fecha: string) => + (fecha.split('/')[1]);

  private getYear = (fecha: string) => + (fecha.split('/')[2]);

  getDate = (fecha: string) => new Date(
    this.getYear(fecha),
    this.getMonth(fecha) - 1,
    this.getDay(fecha)
  )

}
