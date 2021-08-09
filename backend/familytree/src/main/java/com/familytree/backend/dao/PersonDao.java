package com.familytree.backend.dao;

import com.familytree.backend.model.*;

import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.jpa.repository.Query;

public interface PersonDao {
	
	String insertPerson(String id, Person person);
	
	int insertAncestor(String id, Ancestors a);
	
	int insertDescendant(String id, Descendants d);
	
	int insertSpouse(String id, Spouses s);
	
	default String insertPerson(Person person) {
		//System.out.println("From personDao: " + person.getName());
		//String id = RandomStringUtils.randomAlphanumeric(5);
		return insertPerson(person.getPID(), person);
	}
	
	List<Person> selectAllPeople();
	
	Relatives selectFamilyTree(String pid);
	
	Optional<Person> selectPersonById(String id);
	
	List<Ancestors> selectAllAncestorsById(String id);
	
	List<Descendants> selectAllDescendantsById(String id);
	
	List<Spouses> selectAllSpousesById(String id);
	
	List<lifeSketch> selectAllLsById(String id);
	
	int deletePersonById(String id);
	
	int updatePersonById(String id, Person person);
	
	searchName searchPerson(searchName name);
	
	String insertPersonwithRelation(Person person, String relation, String relative);
	
	String insertSketch(String id, lifeSketch ls);
}
