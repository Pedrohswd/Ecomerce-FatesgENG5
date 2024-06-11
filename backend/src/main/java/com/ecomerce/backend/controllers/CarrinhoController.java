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

    @GetMapping("/")
    public List<Carrinho> findAll(){
        return this.carrinhoService.findAll();
    }

    @GetMapping("/{id}")
    public Carrinho findById(@PathVariable Long id){
        return this.carrinhoService.findById(id);
    }

    @PostMapping("/")
    public Carrinho save(Carrinho carrinho){
        return this.carrinhoService.save(carrinho);
    }

    @PutMapping("/")
    public Carrinho update(Carrinho carrinho){
        return this.carrinhoService.save(carrinho);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        this.carrinhoService.delete(id);
    }
}