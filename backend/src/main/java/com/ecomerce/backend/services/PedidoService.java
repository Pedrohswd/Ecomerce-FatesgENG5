package com.ecomerce.backend.services;

import com.ecomerce.backend.entities.*;
import com.ecomerce.backend.repositories.CarrinhoRepository;
import com.ecomerce.backend.repositories.PedidoRepository;
import com.ecomerce.backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Pedido gerarPedido(String emailUsuario) {
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario).orElseThrow(() -> new RuntimeException("Item não encontrado"));
        Carrinho carrinho = usuario.getCarrinho();

        if (carrinho == null || carrinho.getItems().isEmpty()) {
            throw new IllegalStateException("O carrinho está vazio.");
        }

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setDataPedido(LocalDate.now());

        double valorItem = 0;

        for (Item itemCarrinho : carrinho.getItems()) {
            if (itemCarrinho.getProduto().getQuantity() <= 0) {
                throw new IllegalStateException("Produto " + itemCarrinho.getProduto().getName() + " não tem estoque suficiente.");
            }
            if (itemCarrinho.getQuantidade()<= itemCarrinho.getProduto().getQuantity()){
                ItemPedido itemPedido = new ItemPedido();
                itemPedido.setProduto(itemCarrinho.getProduto());
                itemPedido.setQuantidade(itemCarrinho.getQuantidade());
                itemPedido.setPreco(itemCarrinho.getProduto().getPrice());
                itemPedido.setPedido(pedido);
                pedido.getItens().add(itemPedido);
                valorItem += itemCarrinho.getProduto().getPrice() * itemPedido.getQuantidade();
                itemCarrinho.getProduto().setQuantity(itemCarrinho.getProduto().getQuantity() - itemCarrinho.getQuantidade());
            }else{
                throw new IllegalStateException("Produto " + itemCarrinho.getProduto().getName() + " não tem estoque suficiente.");
            }
        }
        pedido.setTotal(valorItem);

        carrinho.getItems().clear();
        carrinhoRepository.delete(carrinho);
        pedido = pedidoRepository.save(pedido);

        return pedido;
    }

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    public List<Pedido> getPedidosByUsuario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Item não encontrado"));
        return pedidoRepository.findByUsuario(usuario);
    }
}