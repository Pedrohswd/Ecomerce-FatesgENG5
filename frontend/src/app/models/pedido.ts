import { Product } from "./product";

export interface Pedido {
    id: number;
    usuarioEmail: string;
    dataPedido: Date;
    itens: ItemPedido[];
    total: number;
}

export interface ItemPedido {
    id: number;
    produto: Product;
    quantidade: number;
    preco: number; // Preço total deste item (produto.preco * quantidade)
}