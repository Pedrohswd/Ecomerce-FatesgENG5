package com.ecomerce.backend.entities;

import com.ecomerce.backend.entities.dtos.UsuarioDTO;
import com.ecomerce.backend.entities.enums.Perfil;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
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


    public Usuario() {
    }

    public Usuario(UsuarioDTO user){
        this.id = user.getId();
        this.email = user.getEmail();
        //this.senha = user.getSenha();
        this.perfil = user.getPerfil();
    }


    public void addPerfil(Perfil perfil) {
        this.perfil = Perfil.toEnum(perfil.getCodigo());
    }

}
