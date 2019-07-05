import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltrarComponent } from './form-filtrar/filtrar/filtrar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './form-filtrar/filtrar/filtrar.component';
import { PaginationComponent } from './shared/pagination/pagination.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services:
import { EjecutarFiltrosService } from './service/filtros/ejecutar-filtros.service';
import { FiltrosFechaService } from './service/filtros/fechas/filtros-fecha.service';

@NgModule({
  declarations: [
    AppComponent,
    FiltrarComponent,
    NgbdSortableHeader,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EjecutarFiltrosService, FiltrosFechaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
