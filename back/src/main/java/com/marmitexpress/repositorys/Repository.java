package com.marmitexpress.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marmitexpress.models.Model;

public interface Repository extends JpaRepository<Model, Long> {
}