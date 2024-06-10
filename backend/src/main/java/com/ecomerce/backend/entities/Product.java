package com.ecomerce.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "produto")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String description;
    private String categoria;
    private double price;
    private Integer quantity;
    private boolean status;

    @Lob
    @Column(name = "image")
    private byte[] image;

    public Product() {
    }

    public Product(Long id, String name, String categoria, String description, double price, Integer quantity, boolean status, byte[] image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.categoria = categoria;
        this.price = price;
        this.quantity = quantity;
        this.status = status;
        this.image = image;
    }
}
