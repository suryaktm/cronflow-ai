package com.cronflow.core.entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @com.fasterxml.jackson.annotation.JsonIgnore
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProjectUser> members;

    public Project() {
    }

    public Project(Long id, String name, String description, Set<ProjectUser> members) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.members = members;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ProjectUser> getMembers() {
        return members;
    }

    public void setMembers(Set<ProjectUser> members) {
        this.members = members;
    }
}
