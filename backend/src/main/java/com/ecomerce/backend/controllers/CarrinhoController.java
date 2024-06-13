package com.ecomerce.backend.controllers;

import com.ecomerce.backend.entities.Carrinho;
import com.ecomerce.backend.services.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @GetMapping("/usuario/{usuarioEmail}")
    public Carrinho obterOuCriarCarrinho(@PathVariable String usuarioEmail) {
        return carrinhoService.findByUser(usuarioEmail);
    }

    @PostMapping("/{usuarioEmail}/adicionar/{produtoId}")
    public Carrinho adicionarProduto(@PathVariable String usuarioEmail, @PathVariable Long produtoId, @RequestParam int quantidade) {
        return carrinhoService.adicionarProduto(usuarioEmail, produtoId, quantidade);
    }

    @DeleteMapping("/{carrinhoId}/remover/{produtoId}")
    public Carrinho removerProduto(@PathVariable Long carrinhoId, @PathVariable Long produtoId) {
        return carrinhoService.removerProduto(carrinhoId, produtoId);
    }

}