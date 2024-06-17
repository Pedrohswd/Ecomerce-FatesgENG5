import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { FuseCardModule } from '@fuse/components/card';
import { CompactComponent } from './compact/compact.component';
import { ToastrModule } from 'ngx-toastr';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PedidosFeitosListComponent } from '../admin/pedidos-feitos-list/pedidos-feitos-list.component';

@NgModule({
    declarations: [ProdutoListComponent, CompactComponent, PedidoListComponent, PedidosFeitosListComponent],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        FuseCardModule,
        FuseFindByKeyPipeModule,
        SharedModule,
        ToastrModule,
        MatPaginatorModule,
        MatTableModule,

    ],
})
export class UserModule {}
