package com.ecomerce.backend.entities;

import com.ecomerce.backend.entities.dtos.UsuarioDTO;
import com.ecomerce.backend.entities.enums.Perfil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private String email;
    private String senha;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pessoa_id", referencedColumnName = "id")
    private Pessoa pessoa;
    @CollectionTable(name = "PERFIS")
    private Perfil perfil;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "carrinho_id", referencedColumnName = "id")
    private Carrinho carrinho;


    public Usuario() {
    }

    public Usuario(Integer id, String email, String senha) {
        this.id = id;
        this.email = email;
        this.senha = senha;
    }

    public Usuario(UsuarioDTO user){
        this.id = user.getId();
        this.email = user.getEmail();
        this.senha = user.getSenha();
        this.perfil = user.getPerfil();
    }


    public void addPerfil(Perfil perfil) {
        this.perfil = Perfil.toEnum(perfil.getCodigo());
    }
}
