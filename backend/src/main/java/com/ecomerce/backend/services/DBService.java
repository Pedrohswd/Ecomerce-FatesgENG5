package com.ecomerce.backend.services;

import com.ecomerce.backend.entities.Endereco;
import com.ecomerce.backend.entities.Pessoa;
import com.ecomerce.backend.entities.Usuario;
import com.ecomerce.backend.entities.enums.Perfil;
import com.ecomerce.backend.repositories.EnderecoRepository;
import com.ecomerce.backend.repositories.PessoaRepository;
import com.ecomerce.backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;

@Service
public class DBService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Transactional
    public void instanciaDB() {
        Pessoa p1 = new Pessoa(null, "Pedro Henrique", "040.198.751-54", "19/12/2003");
        Endereco ed1 = new Endereco(null, "Rua timbiras q2 l8", "Nerópolis", "GO", "75460000", "SN", "");
        ed1.setPessoa(p1);
        p1.setEndereco(ed1);

        Usuario u1 = new Usuario(null, "admin@value.adm", "123");
        u1.addPerfil(Perfil.ADMIN);

        Usuario u2 = new Usuario(null, "pedrohsfwd@gmail.com", "123");
        u2.setPessoa(p1);
        u2.addPerfil(Perfil.CLIENTE);

        pessoaRepository.save(p1);
        enderecoRepository.save(ed1);

        usuarioRepository.save(u1);
        usuarioRepository.save(u2);
    }
}