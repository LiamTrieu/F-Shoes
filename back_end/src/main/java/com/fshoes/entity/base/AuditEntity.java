package com.fshoes.entity.base;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;

import java.util.Calendar;

@Getter
@Setter
@MappedSuperclass
public abstract class AuditEntity {

    @Column(updatable = false)
    private Long createdAt;

    @Column
    private Long updatedAt;

    @Column
    private String createdBy;

    @Column
    private String updatedBy;

    @PrePersist
    private void onCreate(){
        this.setCreatedAt(getLongDate());
        this.setUpdatedAt(getLongDate());
        this.setCreatedBy("Nguyen Van A");
        this.setUpdatedBy("Nguyen Van A");
    }

    @PreUpdate
    private void onUpdate(){
        this.setUpdatedAt(getLongDate());
        this.setUpdatedBy("Nguyen Van B");
    }

    private Long getLongDate() {
        return Calendar.getInstance().getTimeInMillis();
    }
}
