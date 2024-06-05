package com.ecomerce.backend.entities.dtos;

import com.ecomerce.backend.entities.Pessoa;
import com.ecomerce.backend.entities.Usuario;
import lombok.Data;

@Data
public class PessoaDTO {

    protected Integer id;
    protected String nome;
    protected String cpf;
    protected String dataNascimento;
    protected EnderecoDTO endereco;
    protected Usuario usuarios;

    public PessoaDTO() {
    }

    public PessoaDTO(Pessoa pessoa) {
        this.id = pessoa.getId();
        this.nome = pessoa.getNome();
        this.cpf = pessoa.getCpf();
        this.dataNascimento = pessoa.getDataNascimento();
        EnderecoDTO enderecoDTO = new EnderecoDTO(pessoa.getEndereco());
        this.endereco= enderecoDTO;
    }
}
