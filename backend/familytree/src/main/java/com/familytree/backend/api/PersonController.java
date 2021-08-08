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

import com.familytree.backend.model.Ancestors;
import com.familytree.backend.model.Descendants;
import com.familytree.backend.model.Person;
import com.familytree.backend.model.Spouses;
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
	public void addPerson(@RequestBody Person person) {
		//System.out.println("From personController: " + person.getName());
		personService.addPerson(person);
	}
	
	@PostMapping(path = "{pid}/ancestors") 
	public void addAncestor(@PathVariable("pid") String pid, @RequestBody Ancestors ancestor) {
		//System.out.println("From personController: " + person.getName());
		personService.addAncestor(pid, ancestor);
	}
	
	@PostMapping(path = "{pid}/descendants") 
	public void addDescendant(@PathVariable("pid") String pid, @RequestBody Descendants descendant) {
		//System.out.println("From personController: " + person.getName());
		personService.addDescendant(pid, descendant);
	}
	
	@PostMapping(path = "{pid}/spouses") 
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
	
	@GetMapping(path = "{pid}/ancestors")
	public List<Ancestors> getAncestorsById(@PathVariable("pid")String id) {
		return personService.selectAllAncestors(id);
	}
	
	@GetMapping(path = "{pid}/descendants")
	public List<Descendants> getDescendantsById(@PathVariable("pid")String id) {
		return personService.selectAllDescendants(id);
	}
	
	@GetMapping(path = "{pid}/spouses")
	public List<Spouses> getSpousesById(@PathVariable("pid")String id) {
		return personService.selectAllSpouses(id);
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
