package com.familytree.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.familytree.backend.model.Person;

public interface UserRepository extends JpaRepository<Person, String> {

	@Query(
			  value = "SELECT * FROM PERSON NATURAL JOIN ANCESTORS",
			  nativeQuery = true)
		List<Person> sapbq(); 
	
}
