package com.fshoes.entity.base;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@MappedSuperclass
public abstract class AuditEntity {

    @Column(updatable = false)
    private Date createdAt;

    @Column
    private Date updatedAt;

    @Column
    private String createdBy;

    @Column
    private String updatedBy;

    @PrePersist
    private void onCreate(){
        this.setCreatedAt(new Date());
        this.setUpdatedAt(new Date());
        this.setCreatedBy("Nguyen Van A");
        this.setUpdatedBy("Nguyen Van A");
    }

    @PreUpdate
    private void onUpdate(){
        this.setUpdatedAt(new Date());
        this.setUpdatedBy("Nguyen Van B");
    }
}
