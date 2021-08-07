package com.familytree.backend.dao;

import java.util.List;
import java.util.Optional;

import com.familytree.backend.model.Ancestors;
import com.familytree.backend.model.Descendants;
import com.familytree.backend.model.Spouses;

public interface DASDao {
	
	//int insertDAS(String id, Ancestors a);
	
	//int insertDAS(String id, Descendants d);
	
	//int insertDAS(String id, Spouses s);
	
	List<Ancestors> selectAllAncestorsById(String id);
	
	List<Descendants> selectAllDescendantsById(String id);
	
	List<Spouses> selectAllSpousesById(String id);
	
}
