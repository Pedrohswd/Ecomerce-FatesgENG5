package com.ecomerce.backend.repositories;

import com.ecomerce.backend.entities.Pedido;
import com.ecomerce.backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuario(Usuario usuario);
}
