import { API_CONFIG } from './../core/config/API_CONFIG';
import { Carrinho } from './../models/carrinho';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import notyf from 'app/core/config/utils';
import { CarrinhoItem } from 'app/models/carrinhoItem';
import { Pedido } from 'app/models/pedido';
import { Product } from 'app/models/product';
import { Toast, ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _products: BehaviorSubject<Product[]> = new BehaviorSubject<
        Product[]
    >(null);
    private _pedidos: BehaviorSubject<Pedido[]> = new BehaviorSubject<Pedido[]>(
        null
    );

    constructor(private _httpClient: HttpClient) {}

    get products$(): Observable<Product[]> {
        return this._products.asObservable();
    }

    get pedidos$(): Observable<Pedido[]> {
        return this._pedidos.asObservable();
    }

    getCertificateById(eventId: any): Observable<any> {
        return this._products.pipe(
            map((events: any[]) =>
                events.find((event) => event.id === +eventId)
            )
        );
    }

    getAll(): Product[] {
        return this._products.value;
    }

    getAllPedidos(): Pedido[] {
        return this._pedidos.value;
    }

    getPedidosByUsuario(): Observable<Pedido[]> {
        const emailUser = AuthUtils.getUserEmail();
        return this._httpClient.get<Pedido[]>(
            `${API_CONFIG.baseUrl}/api/pedidos/usuario/${emailUser}`
        );
    }

    findAllPedidos(): Observable<Pedido[]> {
        return this._httpClient.get<Pedido[]>(
            `${API_CONFIG.baseUrl}/api/pedidos`
        );
    }

    findAllProducts() {
        return this._httpClient
            .get<Product[]>(`${API_CONFIG.baseUrl}/api/product/`)
            .pipe(
                tap((product: Product[]) => {
                    this._products.next(product);
                })
            );
    }

    obterOuCriarCarrinho(): Observable<Carrinho> {
        const emailUser = AuthUtils.getUserEmail();
        return this._httpClient.get<Carrinho>(
            `${API_CONFIG.baseUrl}/api/carrinho/usuario/${emailUser}`
        );
    }

    adicionarProduto(produtoId: number, quantidade: number): void {
        const usuarioEmail = AuthUtils.getUserEmail();
        this._httpClient
            .post<Carrinho>(
                `${API_CONFIG.baseUrl}/api/carrinho/${usuarioEmail}/adicionar/${produtoId}`,
                null,
                {
                    params: {
                        quantidade: quantidade.toString(),
                    },
                    responseType: 'json',
                }
            )
            .subscribe(
                (response) => {
                    notyf.success('Item atualizado no carrinho');
                },
                (error) => {
                    notyf.error('Erro ao adicionar ao carrinho');
                }
            );
    }

    gerarPedido(): void {
        const emailUser = AuthUtils.getUserEmail();
        this._httpClient
            .post<Pedido>(`${API_CONFIG.baseUrl}/api/pedidos/gerar`, null, {
                params: {
                    emailUsuario: emailUser,
                },
                responseType: 'json',
            })
            .subscribe(
                (response) => {
                    notyf.success('Pedido realizado com sucesso!');
                },
                (error) => {
                    notyf.error('Erro ao realizar pedido pedido:');
                }
            );
    }
}
