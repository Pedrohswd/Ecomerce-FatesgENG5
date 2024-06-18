package com.ecomerce.backend.services;

import com.ecomerce.backend.entities.Usuario;
import com.ecomerce.backend.entities.dtos.UsuarioDTO;
import com.ecomerce.backend.repositories.UsuarioRepository;
import com.ecomerce.backend.services.exceptions.DataIntegrityViolationException;
import com.ecomerce.backend.services.exceptions.ObjectnotFoundException;
import com.ecomerce.backend.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;
    @Autowired
    private PessoaService pessoaService;


    public Usuario create(UsuarioDTO usuarioDTO) {
        usuarioDTO.setId(null);
        validaPorEmail(usuarioDTO);
        Usuario usuario = new Usuario(usuarioDTO);
        usuario.setPessoa(pessoaService.findByCpf(usuarioDTO.getCpf()));
        usuario.setSenha(Utils.hashPassword(usuarioDTO.getSenha()));
        usuario = repository.save(usuario);
        return usuario;
    }

    private void validaPorEmail(UsuarioDTO objDTO) {
        Optional<Usuario> obj = repository.findByEmail(objDTO.getEmail());
        if (obj.isPresent() && obj.get().getId() != objDTO.getId()) {
            throw new DataIntegrityViolationException("Email já cadastrado no sistema!");
        }
    }

    public Usuario findByEmail(String email) {
        Optional<Usuario> user = repository.findByEmail(email);
        return user.orElseThrow(() -> new ObjectnotFoundException("Objeto não encontrado! email: " + email));
    }

    public Usuario findByID(Integer id) {
        Optional<Usuario> user = repository.findById(id);
        return user.orElseThrow(() -> new ObjectnotFoundException("Objeto não encontrado! id: " + id));
    }

    public Usuario update(Integer id, UsuarioDTO usuarioDTO) {
        usuarioDTO.setId(id);
        validaPorEmail(usuarioDTO);
        Usuario old = findByID(id);
        String senha = usuarioDTO.getSenha();
        if(senha == null|| senha == ""){
            usuarioDTO.setSenha(old.getSenha());
        }else{
            old.setSenha(usuarioDTO.getSenha());
        }
        old = new Usuario(usuarioDTO);
        old.setPessoa(pessoaService.findByCpf(usuarioDTO.getCpf()));
        old = repository.save(old);
        return old;
    }

}
