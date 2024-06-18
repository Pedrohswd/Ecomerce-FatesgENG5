package com.ecomerce.backend.services;

import com.ecomerce.backend.entities.Carrinho;
import com.ecomerce.backend.entities.Item;
import com.ecomerce.backend.entities.Product;
import com.ecomerce.backend.entities.Usuario;
import com.ecomerce.backend.repositories.CarrinhoRepository;
import com.ecomerce.backend.repositories.ProductRepository;
import com.ecomerce.backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProductRepository productRepository;


    public List<Carrinho> findAll() {
        return this.carrinhoRepository.findAll();
    }

    public Carrinho findById(Long id) {
        return this.carrinhoRepository.findById(id).orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));
    }

    public Carrinho findByUser(String usuarioEmail) {
        Usuario usuario = usuarioRepository.findByEmail(usuarioEmail).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Carrinho carrinho = usuario.getCarrinho();
        if (carrinho == null) {
            carrinho = new Carrinho(null, new ArrayList<>(),usuario);
            carrinho = carrinhoRepository.save(carrinho);
            usuario.setCarrinho(carrinho);
            usuarioRepository.save(usuario);
        }
        return carrinho;
    }

    @Transactional
    public void delete(Long id) {
        this.carrinhoRepository.deleteById(id);
    }

    public Carrinho adicionarProduto(String usuarioEmail, Long produtoId, int quantidade) {
        Carrinho carrinho = findByUser(usuarioEmail);
        Optional<Product> optionalProduto = productRepository.findById(produtoId);


        if (optionalProduto.isPresent()) {
            Product produto = optionalProduto.get();

            Item itemExistente = carrinho.getItems().stream()
                    .filter(item -> item.getProduto().getId().equals(produtoId))
                    .findFirst()
                    .orElse(null);

            if (itemExistente != null) {
                itemExistente.setQuantidade(itemExistente.getQuantidade() + quantidade);
                if(itemExistente.getQuantidade() <= 0){
                    removerProduto(carrinho.getId(), itemExistente.getProduto().getId());
                }
            } else if(quantidade > 0) {
                Item novoItem = new Item();
                novoItem.setProduto(produto);
                novoItem.setQuantidade(quantidade);
                novoItem.setCarrinho(carrinho);
                carrinho.getItems().add(novoItem);
            }

            return carrinhoRepository.save(carrinho);
        } else {
            throw new RuntimeException("Carrinho ou Produto não encontrado");
        }
    }

    public Carrinho removerProduto(Long carrinhoId, Long produtoId) {
        Optional<Carrinho> optionalCarrinho = carrinhoRepository.findById(carrinhoId);

        if (optionalCarrinho.isPresent()) {
            Carrinho carrinho = optionalCarrinho.get();

            // Encontrar o item a ser removido
            Item itemExistente = carrinho.getItems().stream()
                    .filter(item -> item.getProduto().getId().equals(produtoId))
                    .findFirst()
                    .orElse(null);

            if (itemExistente != null) {
                // Remover o item do carrinho
                carrinho.getItems().remove(itemExistente);
                carrinhoRepository.save(carrinho);
            }

            return carrinho;
        } else {
            throw new RuntimeException("Carrinho não encontrado");
        }
    }
}
