package com.ecomerce.backend.entities.dtos;

import com.ecomerce.backend.entities.Endereco;
import com.ecomerce.backend.entities.Pessoa;
import lombok.Data;

@Data
public class EnderecoDTO {
    private Long id;
    private String rua;
    private String numero;
    private String complemento;
    private String cidade;
    private String bairro;
    private String cep;

    private Pessoa pessoa;


    public EnderecoDTO() {
    }

    public EnderecoDTO(Endereco endereco) {
        this.id = endereco.getId();
        this.rua = endereco.getRua();
        this.cidade = endereco.getCidade();
        this.bairro = endereco.getBairro();
        this.cep = endereco.getCep();
        this.numero = endereco.getNumero();
    }

}
