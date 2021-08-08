package com.familytree.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class searchName {

	private String fname;
	
	private String lname;
	
	private List<Person> fandlmatches = new ArrayList<>();
	
	private List<Person> fmatches = new ArrayList<>();
	
	private List<Person> lmatches = new ArrayList<>();
	
	public searchName() {
		super();
	}
	
	public searchName(@JsonProperty("fname") String fname, 
					  @JsonProperty ("lname") String lname) {
		
		this.fname = fname.toLowerCase();
		this.lname = lname.toLowerCase();
		
	}
	
	public searchName (String a, String b, List<Person> c, List<Person> d, List<Person> e) {
		this.fname = a;
		this.lname = b;
		this.fandlmatches = c;
		this.fmatches = d;
		this.lmatches = e;
	}
	
	public String getf() {
		return fname;
	}
	
	public String getl() {
		return lname;
	}

	public List<Person> getFandlmatches() {
		return fandlmatches;
	}

	public void setFandlmatches(List<Person> fandlmatches) {
		this.fandlmatches = fandlmatches;
	}

	public List<Person> getFmatches() {
		return fmatches;
	}

	public void setFmatches(List<Person> fmatches) {
		this.fmatches = fmatches;
	}

	public List<Person> getLmatches() {
		return lmatches;
	}

	public void setLmatches(List<Person> lmatches) {
		this.lmatches = lmatches;
	}
	
	
}
