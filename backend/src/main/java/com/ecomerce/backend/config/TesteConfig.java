package com.ecomerce.backend.config;

import com.ecomerce.backend.services.DBService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;


@Configuration
public class TesteConfig {
    @Autowired
    private DBService dBservice;

    @PostConstruct
    public void instanciaDB(){
        dBservice.instanciaDB();
    }

}
