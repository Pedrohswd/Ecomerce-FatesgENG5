package com.ecomerce.backend.entities;

import com.ecomerce.backend.entities.dtos.EnderecoDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String rua;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String cep;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "pessoa_id", referencedColumnName = "id")
    private Pessoa pessoa;

    public Endereco() {
    }

    public Endereco(Long id, String rua, String cidade, String bairro, String cep, String numero, String complemento) {
        this.id = id;
        this.rua = rua;
        this.cidade = cidade;
        this.bairro = bairro;
        this.cep = cep;
        this.numero = numero;
    }

    public Endereco(EnderecoDTO endereco) {
        this.id = endereco.getId();
        this.rua = endereco.getRua();
        this.cidade = endereco.getCidade();
        this.bairro = endereco.getBairro();
        this.cep = endereco.getCep();
        this.numero = endereco.getNumero();
    }

    @Override
    public String toString() {
        return "Endereco{" +
                "id=" + id +
                ", bairro='" + bairro + '\'' +
                ", cep='" + cep + '\'' +
                ", cidade='" + cidade + '\'' +
                ", complemento='" + complemento + '\'' +
                ", numero='" + numero + '\'' +
                ", rua='" + rua + '\'' +
                // Avoid calling toString() on Pessoa to prevent circular reference
                ", pessoaId=" + (pessoa != null ? pessoa.getId() : null) +
                '}';
    }
}
