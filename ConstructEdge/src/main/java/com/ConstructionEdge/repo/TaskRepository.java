package com.ConstructionEdge.repo;

import com.ConstructionEdge.entity.Task;
import com.ConstructionEdge.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // ✅ ENUM-based methods
    long countByStatus(TaskStatus status);

    List<Task> findByStatus(TaskStatus status);

    // ✅ Project-based counts
    long countByProject_ProjectId(Long projectId);

    long countByStatusAndProject_ProjectId(TaskStatus status, Long projectId);
    
    List<Task> findByProject_ProjectId(Long projectId);

}
