package main.java.com.marmitexpress.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import main.java.com.marmitexpress.models.Model;

public interface Repository extends JpaRepository<Model, Long> {
}