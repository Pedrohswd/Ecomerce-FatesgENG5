package com.ecomerce.backend.repositories;

import com.ecomerce.backend.entities.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnderecoRepository extends JpaRepository<Endereco, Integer> {
}
