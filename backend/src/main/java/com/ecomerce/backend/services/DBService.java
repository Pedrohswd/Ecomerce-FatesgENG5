package com.ecomerce.backend.services;

import com.ecomerce.backend.entities.*;
import com.ecomerce.backend.entities.enums.Perfil;
import com.ecomerce.backend.repositories.*;
import com.ecomerce.backend.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.DayOfWeek;
import java.util.Base64;
import java.util.List;

@Service
public class DBService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private DataSource dataSource;

    @Transactional
    public void instanciaDB() {
        Pessoa p1 = new Pessoa(null, "Pedro Henrique", "040.198.751-54", "19/12/2003");
        Endereco ed1 = new Endereco(null, "Rua timbiras q2 l8", "Nerópolis", "GO", "75460000", "SN", "");
        ed1.setPessoa(p1);
        p1.setEndereco(ed1);

        Usuario u1 = new Usuario(null, "admin@value.adm", Utils.hashPassword("123"));
        u1.addPerfil(Perfil.ADMIN);

        Usuario u2 = new Usuario(null, "pedrohsfwd@gmail.com", Utils.hashPassword("123"));
        u2.setPessoa(p1);
        u2.addPerfil(Perfil.CLIENTE);

        Product product1 = new Product(null, "Rolex N21", "Relógio", "Rolex", 29000.27, 2, true, null);
        Product product2 = new Product(null, "Anel 2992", "Anel", "Vivara", 1299.99, 2, true, null);
        Product product3 = new Product(null, "Oculos Lacoste", "Óculos", "Lacoste", 290.5, 2, true, null);

        this.productRepository.save(product1);
        this.productRepository.save(product2);
        this.productRepository.save(product3);

        pessoaRepository.save(p1);
        enderecoRepository.save(ed1);

        usuarioRepository.save(u1);
        usuarioRepository.save(u2);

    }
}