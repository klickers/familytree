package com.familytree.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.familytree.backend.model.lifeSketch;

@Repository

public interface LifeSketchRepository extends JpaRepository<lifeSketch, Long>{

}
