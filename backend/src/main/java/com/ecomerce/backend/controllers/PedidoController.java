package com.ecomerce.backend.controllers;

import com.ecomerce.backend.entities.Pedido;
import com.ecomerce.backend.services.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/gerar")
    public ResponseEntity<Pedido> gerarPedido(@RequestParam String emailUsuario) {
        try {
            Pedido pedido = pedidoService.gerarPedido(emailUsuario);
            return ResponseEntity.ok(pedido);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping
    public List<Pedido> getAllPedidos() {
        return pedidoService.getAllPedidos();
    }

    @GetMapping("/usuario/{email}")
    public List<Pedido> getPedidosByUsuario(@PathVariable String email) {
        return pedidoService.getPedidosByUsuario(email);
    }
}
