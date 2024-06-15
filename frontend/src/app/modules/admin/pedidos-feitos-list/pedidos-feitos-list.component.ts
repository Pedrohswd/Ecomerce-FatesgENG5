import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'app/models/pedido';
import { UserService } from 'app/modules/user.service';

@Component({
  selector: 'app-pedidos-feitos-list',
  templateUrl: './pedidos-feitos-list.component.html',
  styleUrls: ['./pedidos-feitos-list.component.scss']
})
export class PedidosFeitosListComponent implements OnInit, AfterViewInit{

  ELEMENT_DATA: Pedido[] = []


  displayedColumns: string[] = ['expand', 'id', 'usuario', 'dataPedido', 'total', 'email'];
  dataSource = new MatTableDataSource<Pedido>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: UserService) { }
  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAllPedidos().subscribe((resposta)=>{
      console.log(resposta)
      this.ELEMENT_DATA= resposta;
      this.dataSource.data = this.ELEMENT_DATA;
      console.log(this.ELEMENT_DATA)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
