package com.original.desafio.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

@Entity
public class PersonEntity {

    @ApiModelProperty(value = "Código da pessoa")
    @Id
    @GeneratedValue
    private Long id;

    @ApiModelProperty(value = "Número de documento de CPF da pessoa")
    private Long cpf;

    @ApiModelProperty(value = "Nome da pessoa")
    private String name;

    @ApiModelProperty(value = "Genero da pessoa")
    private String gender;

    @ApiModelProperty(value = "Número de documento de identidade da pessoa")
    private Long identity;

    @ApiModelProperty(value = "Número de telefone da pessoa")
    private Long phone;

    @ApiModelProperty(value = "Nome da mãe da pessoa")
    private String mother;

    @ApiModelProperty(value = "Nome do pai da pessoa (Opcional)")
    private String father;



    public PersonEntity() {}


    public PersonEntity(Long id) {
        this.id = id;
    }

    public PersonEntity(Long id, Long cpf, String name) {
        this.id = id;
        this.cpf = cpf;
        this.name = name;
    }

    public PersonEntity(Long id, Long cpf, String gender, String name) {
        this.id = id;
        this.cpf = cpf;
        this.gender = gender;
        this.name = name;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getCpf() { return cpf; }
    public void setCpf(Long cpf) { this.cpf = cpf; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name;}

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Long getIdentity() { return identity; }
    public void setIdentity(Long identity) { this.identity = identity; }

    public Long getPhone() { return phone; }
    public void setPhone(Long phone) { this.phone = phone; }

    public String getMother() { return mother; }
    public void setMother(String mother) { this.mother = mother; }

    public String getFather() { return father; }
    public void setFather(String father) { this.father = father; }

}
