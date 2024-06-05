package com.ecomerce.backend.services;


import com.ecomerce.backend.entities.Pessoa;
import com.ecomerce.backend.entities.dtos.PessoaDTO;
import com.ecomerce.backend.repositories.EnderecoRepository;
import com.ecomerce.backend.repositories.PessoaRepository;
import com.ecomerce.backend.services.exceptions.DataIntegrityViolationException;
import com.ecomerce.backend.services.exceptions.ObjectnotFoundException;
import com.ecomerce.backend.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {
    @Autowired
    private PessoaRepository pessoaRepository;
    @Autowired
    private EnderecoRepository enderecoRepository;

    public List<Pessoa> findAll() {
        List<Pessoa> list = pessoaRepository.findAll();
        return list;
    }

    public Pessoa create(PessoaDTO pessoaDTO) {
        pessoaDTO.setId(null);
        pessoaDTO.getEndereco().setId(null);
        validaPorCpf(pessoaDTO);
        Pessoa pessoa = new Pessoa(pessoaDTO);
        pessoa = pessoaRepository.save(pessoa);
        pessoa.getEndereco().setPessoa(pessoa);
        enderecoRepository.save(pessoa.getEndereco());
        return pessoa;
    }

    public Pessoa update(Integer id, PessoaDTO pessoaDTO) {
        pessoaDTO.setId(id);
        validaPorCpf(pessoaDTO);
        Pessoa pessoaOld = findByID(id);
        pessoaDTO.getEndereco().setId(pessoaOld.getEndereco().getId());
        pessoaOld = new Pessoa(pessoaDTO);
        pessoaRepository.save(pessoaOld);
        enderecoRepository.save(pessoaOld.getEndereco());
        return pessoaOld;
    }

    private void validaPorCpf(PessoaDTO objDTO) {
        Optional<Pessoa> obj = pessoaRepository.findByCpf(objDTO.getCpf());
        if (obj.isPresent() && obj.get().getId() != objDTO.getId()) {
            throw new DataIntegrityViolationException("CPF já cadastrado no sistema!");
        }
        if (!Utils.validarCPF(objDTO.getCpf())) throw new DataIntegrityViolationException("CPF inválido!");
    }

    public Pessoa findByID(Integer id) {
        Optional<Pessoa> obj = pessoaRepository.findById(id);
        return obj.orElseThrow(() -> new ObjectnotFoundException("Objeto não encontrado! id: " + id));
    }

    public Pessoa findByCpf(String cpf) {
        if (!Utils.validarCPF(cpf)) throw new DataIntegrityViolationException("CPF inválido!");
        Optional<Pessoa> obj = pessoaRepository.findByCpf(cpf);
        return obj.orElseThrow(() -> new ObjectnotFoundException("Objeto não encontrado! CPF: " + cpf));
    }
}
