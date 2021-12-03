package com.original.desafio.service.impl;

import com.original.desafio.model.PersonEntity;
import com.original.desafio.repository.PersonRepository;
import com.original.desafio.service.PersonService;
import com.original.desafio.utils.ResponseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PersonServiceImpl implements PersonService {
    private static final Logger log = LoggerFactory.getLogger(PersonServiceImpl.class);

    @Autowired
    private PersonRepository personRepository;

    @Override
    public List<PersonEntity> findAll() {
        try {
            return (List<PersonEntity>) personRepository.findAll();
        } catch (ResponseException ex) {
            log.error("Erro ao obter lista de pessoas = {}", ex.getStatus());
            throw ex;
        }
    }

    @Override
    public List<PersonEntity> findAllFit() {
        try {
            return (List<PersonEntity>) personRepository.findAllFit();
        } catch (ResponseException ex) {
            log.error("Erro ao obter lista de pessoas com campos especificos = {}", ex.getStatus());
            throw ex;
        }
    }

    @Override
    public Optional<PersonEntity> findById(Long id) {
        try {
            return personRepository.findById(id);
        } catch(ResponseException ex) {
            log.error("Erro ao obter pessoa pelo id = {}, {}", id, ex.getStatus());
            throw ex;
        }
    }

    @Override
    public void create(PersonEntity person) {
        try {
            if (person != null) {

                personRepository.save(person);
            } else {
                log.warn("Pessoa não pode ser nulo");
                throw new ResponseException("Pessoa não pode ser nulo", HttpStatus.BAD_REQUEST);
            }
        } catch(ResponseException ex) {
            log.error("Erro ao tentar criar pessoa, {}", ex.getStatus());
            throw ex;
        }
    }

    @Override
    public void update(PersonEntity person) {
        try {
            if (person != null) {
                personRepository.save(person);
            } else {
                log.warn("Pessoa não pode ser nulo");
                throw new ResponseException("Pessoa não pode ser nulo", HttpStatus.BAD_REQUEST);
            }
        } catch(ResponseException ex) {
            log.error("Erro ao tentar atualizar pessoa, {}", ex.getStatus());
            throw ex;
        }
    }

    @Override
    public void delete(Long id) {
        try {
            Optional<PersonEntity> person = personRepository.findById(id);
            person.ifPresent(u -> personRepository.delete(u));
        } catch(ResponseException ex) {
            log.error("Erro ao tentar deletar pessoa pelo id = {}, {}", id, ex.getStatus());
            throw ex;
        }
    }

}
