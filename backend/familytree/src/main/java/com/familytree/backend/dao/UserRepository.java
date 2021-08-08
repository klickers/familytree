package com.familytree.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.familytree.backend.model.Person;

public interface UserRepository extends JpaRepository<Person, String> {

}
