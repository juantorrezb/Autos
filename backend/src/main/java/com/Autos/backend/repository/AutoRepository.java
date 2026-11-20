package com.Autos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Autos.backend.model.Auto;

@Repository
public interface AutoRepository extends JpaRepository< Auto , Long> {
    
}
