package com.fshoes.entity;

import com.fshoes.entity.base.PrimaryEntity;
import com.fshoes.infrastructure.constant.EntityProperties;
import com.fshoes.infrastructure.constant.StatusVoucher;
import com.fshoes.infrastructure.constant.TypeVoucher;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "voucher")
public class Voucher extends PrimaryEntity {
    @Column(length = EntityProperties.LENGTH_CODE, unique = true)
    private String code;

    @Column(length = EntityProperties.LENGTH_NAME)
    private String name;

    private BigDecimal value;

    private BigDecimal maximumValue;

    private TypeVoucher type;

    private BigDecimal minimumAmount;

    private Integer quantity;

    private Long startDate;

    private Long endDate;

    private StatusVoucher status;
}
