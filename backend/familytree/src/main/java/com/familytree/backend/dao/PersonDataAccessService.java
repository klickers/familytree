package com.familytree.backend.dao;
import com.familytree.backend.model.Person;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


import org.apache.commons.collections4.IterableUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;



@Repository("mysql")
public class PersonDataAccessService implements PersonDao {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public int insertPerson(String id, Person person) {
		// TODO Auto-generated method stub
		Person temp = new Person(id, person.getFname(), person.getLname(), person.getGender(), person.getDob(), person.getDod(), person.getLob(), person.getLod());
		userRepository.save(temp);
		return 1;
	}

	@Override
	public List<Person> selectAllPeople() {
		// TODO Auto-generated method stub
		return IterableUtils.toList(userRepository.findAll());
	}

	@Override
	public Optional<Person> selectPersonById(String id) {
		// TODO Auto-generated method stub
		return IterableUtils.toList(userRepository.findAll()).stream()
				.filter(person -> person.getPID().equals(id))
				.findFirst();
	}

	@Override
	public int deletePersonById(String id) {
		// TODO Auto-generated method stub
		Optional<Person> personMaybe = selectPersonById(id);
		if(personMaybe.isEmpty()) {
			return 0;
		}
		userRepository.delete(personMaybe.get());
		return 1;
	}

	@Override
	public int updatePersonById(String id, Person update) {

		try {
			
		Person toChange = selectPersonById(id).orElseThrow();
		toChange.setFname(update.getFname());
		toChange.setLname(update.getLname());
		toChange.setGender(update.getGender());
		toChange.setDob(update.getDob());
		toChange.setDod(update.getDod());
		toChange.setLob(update.getLob());
		toChange.setLod(update.getLod());
		userRepository.save(toChange);
		
		}catch(NoSuchElementException e) {
			
		}
		return 1;
	}
	
	

}
