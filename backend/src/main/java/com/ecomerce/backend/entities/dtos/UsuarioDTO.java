package com.ecomerce.backend.entities.dtos;

import com.ecomerce.backend.entities.Usuario;
import com.ecomerce.backend.entities.enums.Perfil;
import lombok.Data;

@Data
public class UsuarioDTO {

    private Integer id;

    private String email;

    private String senha;

    private String cpf;

    private Integer perfil;

    public UsuarioDTO() {
    }

    public UsuarioDTO(Usuario usuario){
        this.id= usuario.getId();
        this.email = usuario.getEmail();
        this.senha= usuario.getSenha();
        this.perfil = usuario.getPerfil().getCodigo();
        this.cpf = usuario.getPessoa().getCpf();

    }
    public Perfil getPerfil() {
        return Perfil.toEnum(perfil);
    }


}
