package com.fshoes.entity;

import com.fshoes.entity.base.IntegerEntity;
import com.fshoes.infrastructure.constant.EntityProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "bill_history")
public class Bill_History extends IntegerEntity {
    private Integer statusBill;

    @Column(length = EntityProperties.LENGTH_DESCRIPTION)
    private String note;

    @ManyToOne
    @JoinColumn(name = "id_bill", referencedColumnName = "id")
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "id_staff", referencedColumnName = "id")
    private Staff staff;
}
