package com.familytree.backend.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.familytree.backend.model.Person;

@Repository("fakeDao")
public class FakePersonDataAccessService implements PersonDao{

	private static List<Person> DB = new ArrayList<>();
	
	@Override
	public int insertPerson(String id, Person person) {
		//System.out.println("From FakePerson: " + person.getName());
		//DB.add(new Person(id, person.getPname(), person.getDob(), person.getLob()));
		return 1;
	}

	@Override
	public List<Person> selectAllPeople() {
		return DB;
	}

	@Override
	public Optional<Person> selectPersonById(String id) {
		// TODO Auto-generated method stub
		return DB.stream()
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
		DB.remove(personMaybe.get());
		return 1;
	}

	@Override
	public int updatePersonById(String id, Person update) {
		// TODO Auto-generated method stub
		return selectPersonById(id)
				.map(person -> {
					int index = DB.indexOf(person);
					if(index >= 0) {
	//					DB.set(index, new Person(id, update.getPname(), update.getDob(), update.getLob()));
						return 1;
					}
					return 0;		
				})
				.orElse(0);
	}
}
