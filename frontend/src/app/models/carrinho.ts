import { Product } from "./product";

export interface Item {
    id: number;
    quantidade: number;
    produto: Product;
}

export interface Carrinho {
    id: number;
    nome: string;
    items: Item[];
}
