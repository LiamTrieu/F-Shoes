package com.fshoes.infrastructure.listener;

import com.fshoes.entity.base.AuditEntity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.util.Calendar;

public class AuditEntityListener {

    @PrePersist
    private void onCreate(AuditEntity entity) {
        entity.setCreatedAt(getLongDate());
        entity.setUpdatedAt(getLongDate());
        entity.setCreatedBy("Nguyen Van A");
        entity.setUpdatedBy("Nguyen Van A");
    }

    @PreUpdate
    private void onUpdate(AuditEntity entity) {
        entity.setUpdatedAt(getLongDate());
        entity.setUpdatedBy("Nguyen Van B");
    }

    private Long getLongDate() {
        return Calendar.getInstance().getTimeInMillis();
    }
}
