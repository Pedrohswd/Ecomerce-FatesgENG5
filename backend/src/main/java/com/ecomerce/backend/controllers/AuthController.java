package com.ecomerce.backend.controllers;

import com.ecomerce.backend.entities.Usuario;
import com.ecomerce.backend.entities.dtos.LoginRequestDTO;
import com.ecomerce.backend.entities.dtos.LoginResponseDTO;
import com.ecomerce.backend.security.TokenService;
import com.ecomerce.backend.services.UsuarioService;
import com.ecomerce.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UsuarioService service;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        Usuario user = this.service.findByEmail(body.email());
        if (Utils.hashPassword(body.senha()).equals(user.getSenha())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new LoginResponseDTO(user.getEmail(), token));
        }
        return ResponseEntity.badRequest().build();
    }
}
