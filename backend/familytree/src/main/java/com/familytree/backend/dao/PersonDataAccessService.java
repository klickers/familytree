package com.familytree.backend.dao;

import com.familytree.backend.model.*;

import java.util.ArrayList;
import java.util.HashMap;
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

	@Autowired
	private AncestorRepository aR;
	
	//@Autowired
	//private RelativeRepository rR;
	
	@Override
	public String insertPerson(String id, Person person) {
		// TODO Auto-generated method stub
		Person temp = new Person(id, person.getFname(), person.getLname(), person.getGender(), person.getDob(), person.getDod(), person.getLob(), person.getLod());
		userRepository.save(temp);
		return "Pid : " + temp.getPID();
	}

	@Override
	public List<Person> selectAllPeople() {
		// TODO Auto-generated method stub
		return IterableUtils.toList(userRepository.findAll());
		//return userRepository.sapbq();
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

	@Override
	public int insertAncestor(String id, Ancestors a) {
		// TODO Auto-generated method stub
		Optional<Person> p = selectPersonById(id);
		Optional<Person> aP = selectPersonById(a.getaID());
		
		if(p.isEmpty())
			return 0;
		
		if(aP.isEmpty())
			return 2;
		
		Person act = p.get();
		
		Person forDes = aP.get();
		
		act.getAncestors().add(a);
		
		userRepository.save(act);
		
		forDes.getDescendants().add(new Descendants(act.getPID(), "", "children"));
		
		userRepository.save(forDes);
		
		return 1;

	}

	@Override
	public Relatives selectFamilyTree(String pid) {
		
		//String[] famStr = {"grandfather", "mother", "spouse", "children", "grandchildren", "father", "grandmother"};
		
		ArrayList<String> famStr = new ArrayList<String>();
		
		famStr.add(0, "grandfather");
		famStr.add(1, "grandmother");
		famStr.add(2, "father");
		famStr.add(3, "mother");
		famStr.add(4, "spouse");
		famStr.add(5, "children");
		famStr.add(6, "grandchildren");
		
		Optional<Person> p = selectPersonById(pid);
		
		if(p.isEmpty()) 
			return null;
		
		//Optional<Relatives> opR = selectExistingTree(pid);
		
		Relatives r = new Relatives();
		/*
		if(opR.isPresent()) {
			r = opR.get();
			r.setFTree(null);
			rR.deleteById(pid);
		}
		
		else {
		*/
		
		r.setPid(pid);
		
		r.setP(p.get());
		
		//}
		
		List<Ancestors> aList = p.get().getAncestors();
		List<Descendants> dList = p.get().getDescendants();
		List<Spouses> sList = p.get().getSpouses();
		
		//List<Object> allList = 
		
		HashMap<String, HashMap<Integer, Person>> treeTemplate = new HashMap<String, HashMap<Integer, Person>>();
		
		for(int idx = 0; idx < 7; idx++) {
			
			String temp1 = famStr.get(idx);
			HashMap<Integer, Person> tempMap = new HashMap<Integer, Person>();
			int k = 0;
			
			for(Ancestors i : aList) {
					
				Optional<Person> newP = selectPersonById(i.getaID());
				
				if(newP.isPresent()) {
					
					if(temp1.equals(i.getRelation())) {
						tempMap.put(k, newP.get());
						k++;
					}		
				}
			}
			
			for(Descendants j : dList) {
				
				Optional<Person> newP = selectPersonById(j.getdID());
				
				if(newP.isPresent()) {
					
					if(temp1.equals(j.getRelation())) {
						tempMap.put(k, newP.get());
						k++;
					}		
				}
			}
			
			for(Spouses l : sList) {
				
				Optional<Person> newP = selectPersonById(l.getsID());
				
				if(newP.isPresent()) {
					
					if(temp1.equals(l.getRelation())) {
						tempMap.put(k, newP.get());
						k++;
					}		
				}
			}
			
			treeTemplate.put(temp1, tempMap);
		}
		
		r.setFTree(treeTemplate);
		
		//rR.save(r);
		
		return r;
	}

	@Override
	public int insertDescendant(String id, Descendants d) {
		Optional<Person> p = selectPersonById(id);
		Optional<Person> aD = selectPersonById(d.getdID());
		
		if(p.isEmpty())
			return 0;
		
		if(aD.isEmpty())
			return 2;
		
		Person act = p.get();
		
		Person forAnc = aD.get();
		
		act.getDescendants().add(d);
		
		userRepository.save(act);
		
		if(act.getGender().toLowerCase().equals("male"))
			forAnc.getAncestors().add(new Ancestors(act.getPID(), "", "father"));
		
		if(act.getGender().toLowerCase().equals("female"))
			forAnc.getAncestors().add(new Ancestors(act.getPID(), "", "mother"));
		
		userRepository.save(forAnc);
		
		return 1;
	}

	@Override
	public int insertSpouse(String id, Spouses s) {
		Optional<Person> p = selectPersonById(id);
		Optional<Person> aS = selectPersonById(s.getsID());
		
		if(p.isEmpty())
			return 0;
		
		if(aS.isEmpty())
			return 2;
		
		Person act = p.get();
		Person forSpo = aS.get();
		
		act.getSpouses().add(s);
		
		userRepository.save(act);
		
		forSpo.getSpouses().add(new Spouses(act.getPID(), "", "spouse"));
		
		userRepository.save(forSpo);
		
		return 1;
	}

	@Override
	public List<Ancestors> selectAllAncestorsById(String id) {
		Optional<Person> p = selectPersonById(id);
		
		if(p.isEmpty())
			return null;
		
		Person act = p.get();
		
		return act.getAncestors();
		
	}

	@Override
	public List<Descendants> selectAllDescendantsById(String id) {
		
		Optional<Person> p = selectPersonById(id);
		
		if(p.isEmpty())
			return null;
		
		Person act = p.get();
		
		return act.getDescendants();
	}

	@Override
	public List<Spouses> selectAllSpousesById(String id) {
		Optional<Person> p = selectPersonById(id);
		
		if(p.isEmpty())
			return null;
		
		Person act = p.get();
		
		return act.getSpouses();
	}

	@Override
	public searchName searchPerson(searchName s) {
		
		String f = s.getf();
		String l = s.getl();
		
		List<Person> ppl = IterableUtils.toList(userRepository.findAll());
		List<Person> fandl = s.getFandlmatches();
		List<Person> fonly = s.getFmatches();
		List<Person> lonly = s.getLmatches();
		
		for (Person p : ppl) {
			
			String fonL = p.getFname().toLowerCase();
			String lonL = p.getLname().toLowerCase();
			
			if(f.equals(fonL) && l.equals(lonL)) {
				fandl.add(p);
			}
			
			else if(f.equals(fonL)) {
				fonly.add(p);
			}
			
			else if(l.equals(lonL)) {
				lonly.add(p);
			}
			
		}
		
		s.setFandlmatches(fandl);
		s.setFmatches(fonly);
		s.setLmatches(lonly);
		return s;
	}

	@Override
	public String insertPersonwithRelation(Person person, String relation, String relative) {
		
		// insertPerson(person.getPID(), person);
		
		Person temp = new Person(person.getPID(), person.getFname(), person.getLname(), person.getGender(), person.getDob(), person.getDod(), person.getLob(), person.getLod());
		userRepository.save(temp);
		
		String insertedPerson = "PID: " + temp.getPID(); 
		
		String reLow = relation.toLowerCase();
		
		if(reLow.equals("mother") || reLow.equals("father")) {
			
			Ancestors a = new Ancestors();
			a.setRelation(relation);
			a.setaID(relative);
			
			int iA = insertAncestor(temp.getPID(), a);
			
			
			if(iA == 0)
				return insertedPerson + "\n" + "Failed : Person did not exist during inserting ancestor, however person profile is complete";
			else
				return insertedPerson + "\n" + "Successfully inserted ancestor";
			
		}
		
		else if(reLow.equals("children")) {
			
			Descendants d = new Descendants();
			d.setRelation(relation);
			d.setdID(relative);
			int iD = insertDescendant(person.getPID(), d);
			
			if(iD == 0)
				return insertedPerson + "\n" + "Failed : Person did not exist during inserting desc, however person profile is complete";
			else
				return insertedPerson + "\n" + "Successfully inserted descendant";
			
		}

		else if(reLow.equals("spouse")) {
			
			Spouses s = new Spouses();
			s.setRelation(relation);
			s.setsID(relative);
			int iS = insertSpouse(person.getPID(), s);
			
			if(iS == 0)
				return insertedPerson + "\n" + "Failed : Person did not exist during inserting spou, however person profile is complete";
			else
				return insertedPerson + "\n" + "Successfully inserted spouse";
			
		}
		
		else 
			return insertedPerson + "\n" + "Invalid relation";
	}

	@Override
	public String insertSketch(String id, lifeSketch ls) {
		
		Optional<Person> p = selectPersonById(id);
		
		if(p.isEmpty())
			return "Failed: person does not exist, create person first";
		
		Person act = p.get();
		
		act.getlSketch().add(ls);
		
		userRepository.save(act);
		
		return "Successfully added sketch";
	}

	@Override
	public List<lifeSketch> selectAllLsById(String id) {
		
		Optional<Person> p = selectPersonById(id);
		
		if(p.isEmpty())
			return null;
		
		Person act = p.get();
		
		return act.getlSketch();
	}



	
	
	

}
