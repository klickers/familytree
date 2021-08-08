package com.familytree.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.familytree.backend.dao.DASDao;
import com.familytree.backend.dao.PersonDao;
import com.familytree.backend.model.Ancestors;
import com.familytree.backend.model.Descendants;
import com.familytree.backend.model.Person;
import com.familytree.backend.model.Relatives;
import com.familytree.backend.model.Spouses;
import com.familytree.backend.model.searchName;

@Service
public class PersonService {

	private final PersonDao personDao;
	private final DASDao d;

	@Autowired
	public PersonService(@Qualifier("mysql") PersonDao personDao, @Qualifier("anotherOne")DASDao d) {
		this.personDao = personDao;
		this.d = d;
	}
	
	public String addPerson(Person person) {
		//System.out.println("From personService: " + person.getName());
		return personDao.insertPerson(person);
		
	}
	
	public int addAncestor(String s, Ancestors a) {
		return personDao.insertAncestor(s, a);
	}
	
	public List<Ancestors> selectAllAncestors(String s) {
		return personDao.selectAllAncestorsById(s);
	}
	
	public int addDescendant(String s, Descendants da) {
		return personDao.insertDescendant(s, da);
	}
	
	public List<Descendants> selectAllDescendants(String s) {
		return personDao.selectAllDescendantsById(s);
	}
	
	public int addSpouse(String s, Spouses sp) {
		return personDao.insertSpouse(s, sp);
	}
	
	public List<Spouses> selectAllSpouses(String s) {
		return personDao.selectAllSpousesById(s);
	}
	
	public List<Person> getAllPeople() {
		return personDao.selectAllPeople();
	}
	
	public Optional<Person> getPersonById(String id){
		return personDao.selectPersonById(id);
	}
	
	public int deletePerson(String id) {
		return personDao.deletePersonById(id);
	}
	
	public int updatePerson(String id, Person newPerson) {
		return personDao.updatePersonById(id, newPerson);
	}
	
	public Relatives getTree(String pid) {
		return personDao.selectFamilyTree(pid);
	}
	
	public searchName searchPerson(searchName toFind) {
		return personDao.searchPerson(toFind);
	}
	
}
