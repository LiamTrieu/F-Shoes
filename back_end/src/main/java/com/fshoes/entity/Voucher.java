package com.fshoes.entity;

import com.fshoes.entity.base.PrimaryEntity;
import com.fshoes.infrastructure.constant.EntityProperties;
import com.fshoes.infrastructure.constant.StatusVoucher;
import com.fshoes.infrastructure.constant.TypeVoucher;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@ToString
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

    public Integer getType() {
        return type.ordinal();
    }

    public Integer getStatus() {
        return status.ordinal();
    }

    public void setType(Integer type) {
        this.type = TypeVoucher.values()[type];
    }

    public void setStatus(Integer status) {
        this.status = StatusVoucher.values()[status];
    }
}
