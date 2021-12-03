package com.original.desafio.service;


import com.original.desafio.model.PersonEntity;

import java.util.List;
import java.util.Optional;

public interface PersonService {
    List<PersonEntity> findAll();
    List<PersonEntity> findAllFit();
    Optional<PersonEntity> findById(Long id);
    void create(PersonEntity person);
    void update(PersonEntity person);
    void delete(Long id);
}
