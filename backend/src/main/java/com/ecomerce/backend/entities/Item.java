package com.ecomerce.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "QTD_ITEM", nullable = false)
    private Integer quantidade;

    @ManyToOne
    @JoinColumn(name = "ID_CARRINHO", nullable = false)
    @JsonBackReference
    private Carrinho carrinho;

    @ManyToOne
    @JoinColumn(name = "ID_PRODUTO", nullable = false)
    private Product produto;
}
