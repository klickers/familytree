package com.familytree.backend.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.familytree.backend.model.Person;

//@Entity
public class Relatives {
	
	//@Id
	//@GeneratedValue(GenerationType.AUTO)
	private String pid;
	
	private Person p;
	
	private HashMap<String, HashMap<Integer, Person>> fTree;
	
	//private HashMap<String, HashMap<Integer, Person>> s;
	
	//private HashMap<String, HashMap<Integer, Person>> d;
	
	
	public Relatives() {
		super();
	}
	
	public Relatives(String pid, Person p, HashMap<String, HashMap<Integer, Person>> fTree) {
		this.pid = pid;
		this.p = p;
		this.fTree = fTree;
	}
	
	public String getPid() {
		return pid;
	}
	
	public void setPid(String pid) {
		this.pid = pid;
	}

	public Person getP() {
		return p;
	}

	public void setP(Person p) {
		this.p = p;
	}

	public HashMap<String, HashMap<Integer, Person>> getFTree() {
		return fTree;
	}

	public void setFTree(HashMap<String, HashMap<Integer, Person>> a) {
		this.fTree = a;
	}

}