package com.familytree.backend.dao;

import com.familytree.backend.model.Person;

import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.RandomStringUtils;

public interface PersonDao {
	
	int insertPerson(String id, Person person);
	
	//int insertAncestor(String id, Person person);
	
	//int insertDescendant(String id, Person person);
	
	//int insertSpouse(String id, Person person);
	
	default int insertPerson(Person person) {
		//System.out.println("From personDao: " + person.getName());
		//String id = RandomStringUtils.randomAlphanumeric(5);
		return insertPerson(person.getPID(), person);
	}
	
	List<Person> selectAllPeople();
	
	Optional<Person> selectPersonById(String id);
	
	int deletePersonById(String id);
	
	int updatePersonById(String id, Person person);
}
