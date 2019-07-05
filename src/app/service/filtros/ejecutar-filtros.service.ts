import { Injectable } from '@angular/core';
import { FiltrosFechaService } from './fechas/filtros-fecha.service';

@Injectable({
  providedIn: 'root'
})
export class EjecutarFiltrosService {

  cadena = '';
  operadores = ['!=', '>=', '<=', '>', '<', '=', 'BEETWEN', 'AND'];
  noValidos = [' ', '-', '*', '?', '&', '@', '_', '$', '%', '(', ')', '#', '|'];

  campos = {
    Id: 'numeric',
    Mensaje: 'string',
    Fecha: 'date',
    Stack: 'string'
  };

  constructor(private fechaService: FiltrosFechaService) { }

  evaluar(expresion: string, data: any[]) {

    const exp = this.expresion(expresion);

    if (!exp) {
      return null;
    }

    switch (exp.operador) {
      case '!=': {
        return exp.tipo === 'date' ? this.fechaService.fechaDiferenteDe(exp.comparador, exp.campo, data) :
          this.diferenteDe(exp.campo, exp.comparador, data, exp.index === 1);
      }
      case '<': {
        return exp.tipo === 'date' ? this.fechaService.fechaMenorQue(exp.comparador, exp.campo, data) :
          this.menorQue(exp.campo, exp.comparador, data, exp.index === 1);
      }
      case '>': {
        return exp.tipo === 'date' ? this.fechaService.fechaMayorQue(exp.comparador, exp.campo, data) :
          this.mayorQue(exp.campo, exp.comparador, data, exp.index === 1);
      }
      case '=': {
        return exp.tipo === 'date' ? this.fechaService.fechaIgualQue(exp.comparador, exp.campo, data) :
          this.igualQue(exp.campo, exp.comparador, data);
      }
      case '>=': {
        return exp.tipo === 'date' ? this.fechaService.fechaMayorIgualQue(exp.comparador, exp.campo, data) :
          this.mayorIgualQue(exp.campo, exp.comparador, data, exp.index === 1);
      }
      case '<=': {
        return exp.tipo === 'date' ? this.fechaService.fechaMenorIgualQue(exp.comparador, exp.campo, data) :
          this.menorIgualQue(exp.campo, exp.comparador, data, exp.index === 1);
      }
      default:
        {
          return null;
        }
    }
  }

  mayorQue(operando1: string, operando2: any, datos: any[], transponer = false): any {

    const resultado = datos.filter(d => {
      if (!transponer) {
        return d[operando1] > operando2;
      } else {
        return operando2 > d[operando1];
      }
    });

    return resultado || [];

  }

  menorQue(operando1: string, operando2: any, datos: any[], transponer = false): any {

    const resultado = datos.filter(d => {
      if (!transponer) {
        return d[operando1] < operando2;
      } else {
        return operando2 < d[operando1];
      }
    });

    return resultado || [];

  }

  igualQue(operando1: string, operando2: any, datos: any[]): any {

    const resultado = datos.filter(d => {
      return d[operando1] == operando2;
    });

    return resultado || [];
  }

  mayorIgualQue(operando1: string, operando2: any, datos: any[], transponer = false): any {

    const resultado = datos.filter(d => {
      if (!transponer) {
        return d[operando1] >= operando2;
      } else {
        return operando2 >= d[operando1];
      }
    });

    return resultado || [];
  }

  menorIgualQue(operando1: string, operando2: any, datos: any[], transponer = false): any {

    const resultado = datos.filter(d => {
      if (!transponer) {
        return d[operando1] <= operando2;
      } else {
        return operando2 <= d[operando1];
      }
    });

    return resultado || [];
  }

  diferenteDe(operando1: string, operando2: any, datos: any[], transponer = false): any {

    const resultado = datos.filter(d => {
      if (!transponer) {
        return d[operando1] != operando2;
      } else {
        return operando2 != d[operando1];
      }
    });

    return resultado || [];
  }

  private parceOperador(expresion: string) {

    return this.operadores.find(op => {
      return expresion.includes(op);
    });
  }

  private parceOperandos(expresion: string) {

    const operador = this.parceOperador(expresion);
    let operandos = [];

    if (!operador) {
      return null;
    }

    operandos = expresion.split(operador).map(op => op.trim());

    if (operandos.length > 0) {
      return { operandos, operador };
    }

    return null;
  }

  private tieneCarsNovalidos(comparador: string) {
    return (this.noValidos.find(nv => comparador.includes(nv)) || []).length > 0;
  }

  private expresion(expresion: string) {

    const exp = this.parceOperandos(expresion);
    let index = -1;
    let comparador = '';
    let tipoDato = '';

    if (!exp) { return null; }

    const campo = Object.keys(this.campos)
      .find(c => {
        index = -1;
        return exp.operandos.find(o => {
          comparador = exp.operandos[index * -1];
          ++index;
          return o.toUpperCase() === c.toUpperCase();
        });
      });

    tipoDato = this.campos[campo];

    if (this.tieneCarsNovalidos(comparador) && tipoDato !== 'string') {
      return null;
    }

    if (campo) {
      return { campo, index, tipo: tipoDato, comparador, operador: exp.operador };
    }

    return null;

  }

  private getOperadores(): string[] {
    return this.operadores;
  }



}
