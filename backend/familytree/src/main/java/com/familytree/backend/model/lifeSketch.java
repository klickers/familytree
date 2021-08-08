package com.familytree.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class lifeSketch {
	
	  @Id 
	  @GeneratedValue(strategy=GenerationType.AUTO)
	  private long id;
	  
	  private String title;
	  
	  @Column(columnDefinition = "TEXT")
	  private String mediaLink;
	  
	  @Column(columnDefinition = "TEXT")
	  private String description;
	  
	  private String date;

	  public lifeSketch() {
		  super();
	  }
	  
	  public lifeSketch(String title, String mediaLink, String description, String date) {
		this.title = title;
		this.mediaLink = mediaLink;
		this.description = description;
		this.date = date;
	  }

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMediaLink() {
		return mediaLink;
	}

	public void setMediaLink(String mediaLink) {
		this.mediaLink = mediaLink;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
}
