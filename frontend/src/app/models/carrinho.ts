import { Product } from "./product";

export interface CarrinhoItem {
    produto: Product;
    quantidade: number;
    precoTotal: number;
  }
  
  export interface Carrinho {
    id: number;
    items: CarrinhoItem[];
  }
