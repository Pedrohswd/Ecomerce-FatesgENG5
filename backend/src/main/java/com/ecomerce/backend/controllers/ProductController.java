package com.ecomerce.backend.controllers;

import com.ecomerce.backend.entities.Product;
import com.ecomerce.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public List<Product> findAll(){
        return this.productService.findAll();
    }

    @GetMapping("/{id}")
    public Product findById(@PathVariable("id") Long id){
        return this.productService.findById(id);
    }

    @PostMapping("/")
    public Product save(@RequestBody Product product){
        return this.productService.save(product);
    }

    @PutMapping("/")
    public Product update(@RequestBody Product product){
        return this.productService.save(product);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){
        this.productService.delete(id);
    }
}
