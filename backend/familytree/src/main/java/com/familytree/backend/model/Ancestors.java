package com.familytree.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Ancestors {
	
	@Id
	private String aID;
	
	private String pID;
	
	private String aGender;
	
	private String relation;
	
	public Ancestors() {
		super();
	}
	
	public Ancestors(String aID, String pID, String aGender, String relation) {
		this.aID = aID;
		this.pID = pID;
		this.aGender = aGender;
		this.relation = relation;
	}

	public String getaID() {
		return aID;
	}

	public void setaID(String aID) {
		this.aID = aID;
	}

	public String getaGender() {
		return aGender;
	}

	public void setaGender(String aGender) {
		this.aGender = aGender;
	}

	public String getpID() {
		return pID;
	}

	public void setpID(String pID) {
		this.pID = pID;
	}

	public String getRelation() {
		return relation;
	}

	public void setRelation(String relation) {
		this.relation = relation;
	}
}
