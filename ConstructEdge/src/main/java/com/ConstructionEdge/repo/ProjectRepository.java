package com.ConstructionEdge.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ConstructionEdge.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
	
	long countByStatusIgnoreCase(String status);
	List<Project> findByManager_ManagerId(Long managerId);

}

