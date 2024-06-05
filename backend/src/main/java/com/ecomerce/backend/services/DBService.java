package com.ecomerce.backend.services;

import com.ecomerce.backend.repositories.EnderecoRepository;
import com.ecomerce.backend.repositories.PessoaRepository;
import com.ecomerce.backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;

@Service
public class DBService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;


    public void instanciaDB() {
       ;
    }
}