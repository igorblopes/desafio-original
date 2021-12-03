package com.original.desafio.repository;

import com.original.desafio.model.PersonEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PersonRepository extends CrudRepository<PersonEntity, Long> {
    @Query("SELECT new com.original.desafio.model.PersonEntity(p.id, p.cpf, p.gender, p.name) FROM PersonEntity p")
    List<PersonEntity> findAllFit();
}

