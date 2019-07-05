import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { ServiceLogmanagementService } from 'src/app/service/service-logmanagement.service';
import { EjecutarFiltrosService } from 'src/app/service/filtros/ejecutar-filtros.service';
import { FiltrosFechaService } from '../../service/filtros/fechas/filtros-fecha.service';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } =
  { 'asc': 'desc', 'desc': '', '': 'asc' };

export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {
  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.css']
})
export class FiltrarComponent implements OnInit {

  posts: any;
  postsTodos: any;

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  previousPage: any;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private service: ServiceLogmanagementService,
    private op: EjecutarFiltrosService,
    private fechaService: FiltrosFechaService) { }

  ngOnInit() {

    this.loadData();

  }

  ejecutarFiltro(value: string) {

    console.log(this.posts.length);

    if (this.posts.length <= 0) {  this.loadData(); }

    if (this.posts.length <= 0) {  return; }

    const resultadoFitro = this.op.evaluar(value, this.postsTodos);

    if (resultadoFitro.length > 0) {

      console.log('pts: ',resultadoFitro);

      this.posts = resultadoFitro;

      this.collectionSize = this.posts.length;
      this.posts = this.posts.map((country, i) => ({ id: i + 1, ...country }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    } else {
      alert('No hay datos para mostrar.');
    }
  }

  loadData() {

    this.service.getLog().subscribe(
      response => {
        this.postsTodos = this.posts = response;

        this.collectionSize = this.posts.length;
        this.posts = this.posts.map((country, i) => ({ id: i + 1, ...country }))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      }
    );
  }

  loadDataInputEmpty(input) {

    if (input.trim() === '') {
      this.loadData();
    }
  }

  loadPage(page: number, input: string) {

    if (page !== this.previousPage) {
      this.previousPage = page;
      this.ejecutarFiltro(input);
    }
  }

  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting posts
    if (direction === '') {
      this.loadData();
    } else {
      this.posts = [...this.posts].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}
