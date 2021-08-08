package com.familytree.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Spouses {
	
	@Id
	private String sID;
	
	private String pID;
	
	private String sGender;
	
	private String relation;
	
	public Spouses() {
		super();
	}
	
	public Spouses(String sID, String pID, String sGender, String relation) {
		this.sID = sID;
		this.setpID(pID);
		this.sGender = sGender;
		this.setRelation(relation);
	}

	public String getsID() {
		return sID;
	}

	public void setsID(String sID) {
		this.sID = sID;
	}

	public String getsGender() {
		return sGender;
	}

	public void setsGender(String sGender) {
		this.sGender = sGender;
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
