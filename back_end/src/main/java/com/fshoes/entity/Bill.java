package com.fshoes.entity;

import com.fshoes.entity.base.IntegerEntity;
import com.fshoes.infrastructure.constant.EntityProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "bill")
public class Bill extends IntegerEntity {

    @Column(length = EntityProperties.LENGTH_CODE)
    private String code;

    @Column(length = EntityProperties.LENGTH_NAME)
    private String fullName;

    @Column(length = EntityProperties.LENGTH_PHONE)
    private String phoneNumber;

    @Column(length = EntityProperties.LENGTH_ADDRESS)
    private String address;

    private BigDecimal totalMoney;

    private BigDecimal moneyReduced;

    private BigDecimal moneyAfter;

    @Temporal(TemporalType.DATE)
    private Date shipDate;

    @Temporal(TemporalType.DATE)
    private Date receiveDate;

    private BigDecimal moneyShip;

    @Temporal(TemporalType.DATE)
    private Date confirmationDate;

    private Boolean type;

    @Column(length = EntityProperties.LENGTH_DESCRIPTION)
    private String note;

    private BigDecimal customerAmount;

    @Temporal(TemporalType.DATE)
    private Date desiredReceiptDate;

    @Temporal(TemporalType.DATE)
    private Date CompleteDate;

    private Integer status;

    @ManyToOne
    @JoinColumn(name = "id_customer", referencedColumnName = "id")
    private Customer customer;


    @ManyToOne
    @JoinColumn(name = "id_voucher", referencedColumnName = "id")
    private Voucher voucher;
}
