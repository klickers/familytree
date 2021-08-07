package com.familytree.backend.api;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.familytree.backend.model.*;
import com.familytree.backend.service.PersonService;

@RequestMapping("api/v1/person")
@RestController
public class PersonController {

	private final PersonService personService;

	@Autowired
	public PersonController(PersonService personService) {
		this.personService = personService;
	}
	
	@PostMapping
	public String addPerson(@RequestBody Person person) {
		//System.out.println("From personController: " + person.getName());
		return personService.addPerson(person);
	}
	
	@PostMapping(path = "ancestors/{pid}") 
	public void addAncestor(@PathVariable("pid") String pid, @RequestBody Ancestors ancestor) {
		//System.out.println("From personController: " + person.getName());
		personService.addAncestor(pid, ancestor);
	}
	
	@PostMapping(path = "descendants/{pid}") 
	public void addDescendant(@PathVariable("pid") String pid, @RequestBody Descendants descendant) {
		//System.out.println("From personController: " + person.getName());
		personService.addDescendant(pid, descendant);
	}
	
	@PostMapping(path = "spouses/{pid}") 
	public void addSpouse(@PathVariable("pid") String pid, @RequestBody Spouses spouse) {
		//System.out.println("From personController: " + person.getName());
		personService.addSpouse(pid, spouse);
	}
	
	@GetMapping
	public List<Person> getAllPeople() {
		return personService.getAllPeople();
	}
	
	@GetMapping(path = "{pid}")
	public Person getPersonById(@PathVariable("pid")String id) {
		return personService.getPersonById(id).orElse(null);
	}
	
	@GetMapping(path = "ancestors/{pid}")
	public List<Ancestors> getAncestorsById(@PathVariable("pid")String id) {
		return personService.selectAllAncestors(id);
	}
	
	@GetMapping(path = "descendants/{pid}")
	public List<Descendants> getDescendantsById(@PathVariable("pid")String id) {
		return personService.selectAllDescendants(id);
	}
	
	@GetMapping(path = "spouses/{pid}")
	public List<Spouses> getSpousesById(@PathVariable("pid")String id) {
		return personService.selectAllSpouses(id);
	}
	
	@GetMapping(path = "relatives/{pid}")
	public Relatives getTree(@PathVariable("pid")String id) {
		return personService.getTree(id);
	}
	
	@DeleteMapping(path = "{pid}")
	public void deletePerson(@PathVariable("pid") String id) {
		personService.deletePerson(id);
	}
	
	@PutMapping(path = "{pid}")
	public void updatePerson(@PathVariable("pid") String id, @RequestBody Person personToUpdate) {
		personService.updatePerson(id, personToUpdate);
	}
}
