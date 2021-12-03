package com.original.desafio.controller;


import com.original.desafio.model.PersonEntity;
import com.original.desafio.service.PersonService;
import com.original.desafio.utils.ResponseException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/person")
public class PersonController {
     private static final Logger log = LoggerFactory.getLogger(PersonController.class);

    @Autowired
    private PersonService personService;

    @ApiOperation(value = "Retorna uma lista de pessoas")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Retorna a lista de pessoa"),
            @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
    })
    @RequestMapping(value = {"/all"}, method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<PersonEntity> getAll() {
        try {
            return personService.findAll();
        } catch (ResponseException ex) {
            log.error("Erro ao obter lista de pessoas = {}", ex.getStatus());
            throw ex;
        }
    }

    @ApiOperation(value = "Retorna uma lista de pessoas com campos específicos")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Retorna a lista de pessoa com campos específicos"),
            @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
    })
    @RequestMapping(value = {"/all/fit"}, method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<PersonEntity> getAllFit() {
        try {
            return personService.findAllFit();
        } catch (ResponseException ex) {
            log.error("Erro ao obter lista de pessoas especificas= {}", ex.getStatus());
            throw ex;
        }
    }

    @ApiOperation(value = "Retorna uma pessoa pelo id da mesma")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Retorna uma pessoa especifica pelo id"),
            @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
    })
    @RequestMapping(value = {"/get/{id}"}, method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Optional<PersonEntity> getById(@PathVariable("id") Long id) {
        try {
            return personService.findById(id);
        } catch (ResponseException ex) {
            log.error("Erro ao obter pessoa pelo id = {}, {}", id, ex.getStatus());
            throw ex;
        }
    }

    @ApiOperation(value = "Criação de uma nova pessoa")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Criação da pessoa com sucesso"),
            @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
    })
    @RequestMapping(value = {"/new"}, method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> create(@RequestBody PersonEntity person) {
        try {
            personService.create(person);
            log.info("Nova pessoa {} criado com sucesso", person.getName());

            return new ResponseEntity<>("Pessoa criado com sucesso!", HttpStatus.CREATED);
        } catch (ResponseException ex) {
            return new ResponseEntity<>(String.format("Erro ao tentar criar pessoa, %s", ex.getStatus()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "Edição de uma pessoa")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Edição da pessoa com sucesso"),
            @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
    })
    @RequestMapping(value = {"/edit/{id}"}, method = RequestMethod.PUT, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> update(@RequestBody PersonEntity person, @PathVariable("id") Long id) {
        try {
            person.setId(id);
            personService.update(person);
            log.info("Pessoa {} atualizado.", person.getName());

            return new ResponseEntity<>("Usuário atualizado com sucesso!", HttpStatus.OK);
        } catch (ResponseException ex) {
            return new ResponseEntity<>(String.format("Erro ao tentar atualizar o usuário com id = %s, %s", id, ex.getStatus()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "Deleção de uma pessoa")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Deleção da pessoa com sucesso"),
            @ApiResponse(code = 500, message = "Foi gerada uma exceção"),
    })
    @RequestMapping(value = {"/delete/{id}"}, method = RequestMethod.DELETE)
    @ResponseBody
    public String delete(@PathVariable("id") Long id) {
        try {
            personService.delete(id);
            return String.format("Pessoa %s deletado com sucesso!", id);
        } catch (ResponseException ex) {
            return String.format("Erro ao tentar excluir pessoa com id = %s, %s", id, ex.getStatus());
        }
    }

}