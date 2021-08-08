package com.familytree.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Person {
	
	@Id
	@GenericGenerator(name="seq_id", strategy="com.familytree.backend.model.StockCodeGenerator")
	@GeneratedValue(generator="seq_id")
	private String pID;
	
	private String fname;
	
	private String lname;
	
	private String gender;
	
	private String dod;
	
	private String dob;
	
	private String lob;
	
	private String lod;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "p_id", referencedColumnName = "pID")
	List<Ancestors> ancestors = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "p_id", referencedColumnName = "pID")
	List<Descendants> descendants  = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "p_id", referencedColumnName = "pID")
	List<Spouses> spouses = new ArrayList<>();
	
	public Person(){
		super();
	}
	
	public Person(
			@JsonProperty("pid") String uID, 
			@JsonProperty("fname") String fname,
			@JsonProperty("lname") String lname, 
			@JsonProperty("gender") String gender,
			@JsonProperty("dob") String dob,
			@JsonProperty("dod") String dod,
			@JsonProperty("lob") String lob,
			@JsonProperty("lod") String lod) {
		pID = uID;
		this.fname = fname;
		this.lname = lname;
		this.gender = gender;
		this.dob = dob;
		this.dod = dod;
		this.lob = lob;
		this.lod = lod;
	}

	public String getPID() {
		return pID;
	}

	public String getFname() {
		return fname;
	}
	
	public String getLname() {
		return lname;
	}
	
	public String getGender() {
		return gender;
	}
	

	public String getDob() {
		return dob;
	}
	
	public String getDod() {
		return dod;
	}

	public String getLob() {
		return lob;
	}
	
	public String getLod() {
		return lod;
	}
	
	public List<Ancestors> getAncestors(){
		return ancestors;
	}
	
	public List<Descendants> getDescendants(){
		return descendants;
	}
	
	public List<Spouses> getSpouses(){
		return spouses;
	}
	
	/*
	public void setPID(String pID) {
		this.pID = pID;
	}*/
	
	public void setFname(String fname) {
		this.fname = fname;
	}
	
	public void setLname(String lname) {
		this.lname = lname;
	}
	
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public void setDob(String dob) {
		this.dob = dob;
	}
	
	public void setDod(String dod) {
		this.dod = dod;
	}
	
	public void setLob(String lob) {
		this.lob = lob;
	}
	
	public void setLod(String lod) {
		this.lod = lod;
	}
}
