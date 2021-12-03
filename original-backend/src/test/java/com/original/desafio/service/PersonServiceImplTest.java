package com.original.desafio.service;

import com.original.desafio.model.PersonEntity;
import com.original.desafio.repository.PersonRepository;
import com.original.desafio.service.impl.PersonServiceImpl;
import com.original.desafio.utils.ResponseException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

@RunWith(MockitoJUnitRunner.class)
public class PersonServiceImplTest {

    @Mock
    PersonRepository personRepository;

    @InjectMocks
    @Spy
    PersonServiceImpl personService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }


    @Test(expected = ResponseException.class)
    public void findAllException() {
        Mockito.when(personRepository.findAll()).thenThrow(new ResponseException("Exception for findAll"));

        personService.findAll();
    }

    @Test(expected = ResponseException.class)
    public void findAllFitException() {
        Mockito.when(personRepository.findAllFit()).thenThrow(new ResponseException("Exception for findAll"));

        personService.findAllFit();
    }

    @Test
    public void findById() {
        Optional<PersonEntity> response = Optional.of(newPerson());
        Mockito.when(personRepository.findById((long) 1)).thenReturn(response);

        personService.findById((long) 1);
    }

    @Test(expected = ResponseException.class)
    public void findByIdNull() {
        Mockito.when(personRepository.findById(null)).thenThrow(new ResponseException("Exception for findById"));

        personService.findById(null);
    }

    @Test
    public void create() {
        PersonEntity person = newPerson();

        Mockito.when(personRepository.save(person)).thenReturn(person);

        personService.create(person);

        Mockito.verify(personService, Mockito.atMostOnce()).create(person);
    }

    @Test(expected = ResponseException.class)
    public void createNull() {

        personService.create(null);

        Mockito.verify(personService, Mockito.atMostOnce()).create(null);
    }

    @Test
    public void update() {
        PersonEntity person = newPerson();

        Mockito.when(personRepository.save(person)).thenReturn(person);

        personService.update(person);

        Mockito.verify(personService, Mockito.atMostOnce()).update(person);
    }

    @Test(expected = ResponseException.class)
    public void updateNull() {
        personService.update(null);

        Mockito.verify(personService, Mockito.atMostOnce()).update(null);
    }

    @Test
    public void delete() {
        Optional<PersonEntity> response = Optional.of(newPerson());
        Mockito.when(personRepository.findById((long) 1)).thenReturn(response);
        Mockito.doNothing().when(personRepository).delete(response.get());

        personService.delete((long) 1);

        Mockito.verify(personService, Mockito.atMostOnce()).delete((long) 1);
    }

    @Test(expected = ResponseException.class)
    public void deleteThrowsException() {
        Optional<PersonEntity> response = Optional.of(newPerson());

        Mockito.when(personRepository.findById((long) 0)).thenThrow(new ResponseException("Delete exception"));

        personService.delete((long) 0);

        Mockito.verify(personService, Mockito.atMostOnce()).delete((long) 0);
    }

    public PersonEntity newPerson() {
        return new PersonEntity(1l, 12345678999l, "name");
    }
}
