package com.ecomerce.backend.services;

import com.ecomerce.backend.entities.Item;
import com.ecomerce.backend.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> findAll() {
        return this.itemRepository.findAll();
    }

    public Item findById(Long id) {
        return this.itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item não encontrado"));
    }

    public Item save(Item item){
        return this.itemRepository.save(item);
    }

    public void delete(Long id){
        this.itemRepository.deleteById(id);
    }
}
