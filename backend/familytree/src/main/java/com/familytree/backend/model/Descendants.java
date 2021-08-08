package com.familytree.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Descendants {

	@Id
	private String dID;
	
	//private String pID;
	
	private String dGender;
	
	private String relation;
	
	public Descendants() {
		super();
	}
	
	public Descendants(String dID, String dGender, String relation) {
		this.dID = dID;
		//this.setpID(pID);
		this.dGender = dGender;
		this.setRelation(relation);
	}

	public String getdID() {
		return dID;
	}

	public void setdID(String dID) {
		this.dID = dID;
	}

	public String getdGender() {
		return dGender;
	}

	public void setdGender(String dGender) {
		this.dGender = dGender;
	}
/*
	public String getpID() {
		return pID;
	}

	public void setpID(String pID) {
		this.pID = pID;
	}
*/
	public String getRelation() {
		return relation;
	}

	public void setRelation(String relation) {
		this.relation = relation;
	}
	
}
