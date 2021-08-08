package com.familytree.backend.dao;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.collections4.IterableUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.familytree.backend.model.Ancestors;
import com.familytree.backend.model.Descendants;
import com.familytree.backend.model.Spouses;

@Repository("anotherOne")
public class DASDataAccessService implements DASDao{
	
	@Autowired
	private SpouseRepository spouseRepo;
	
	@Autowired
	private DescendantRepository descendantRepo;
	
	@Autowired
	private AncestorRepository ancestorRepo;

	@Override
	public int insertDAS(String id, Ancestors a) {
		// TODO Auto-generated method stub
		Ancestors temp = new Ancestors(a.getaID(), id, a.getaGender(), a.getRelation());
		ancestorRepo.save(temp); 
		return 1;
	}

	@Override
	public int insertDAS(String id, Descendants d) {
		// TODO Auto-generated method stub
		Descendants temp = new Descendants(d.getdID(), id, d.getdGender(), d.getRelation());
		descendantRepo.save(temp); 
		return 1;
	}

	@Override
	public int insertDAS(String id, Spouses s) {
		// TODO Auto-generated method stub
		Spouses temp = new Spouses(s.getsID(), id, s.getsGender(), s.getRelation());
		spouseRepo.save(temp); 
		return 1;
	}

	@Override
	public List<Ancestors> selectAllAncestorsById(String id) {
		// TODO Auto-generated method stub
		
		List<Ancestors> temp = IterableUtils.toList(ancestorRepo.findAll());
		
		if(temp == null)
			return null;
		
		return temp.stream()
				.filter(ancestors -> ancestors.getpID().equals(id))
				.collect(Collectors.toList());
	}

	@Override
	public List<Descendants> selectAllDescendantsById(String id) {
		// TODO Auto-generated method stub
		List<Descendants> temp = IterableUtils.toList(descendantRepo.findAll());
		
		if(temp == null)
			return null;
		
		return temp.stream()
				.filter(descendants -> descendants.getpID().equals(id))
				.collect(Collectors.toList());
	}

	@Override
	public List<Spouses> selectAllSpousesById(String id) {
		// TODO Auto-generated method stub
		List<Spouses> temp = IterableUtils.toList(spouseRepo.findAll());
		
		if(temp == null)
			return null;
		
		return temp.stream()
				.filter(spouses -> spouses.getpID().equals(id))
				.collect(Collectors.toList());
	}
}
