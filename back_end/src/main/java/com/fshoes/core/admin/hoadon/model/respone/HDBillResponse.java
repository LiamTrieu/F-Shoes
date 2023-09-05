package com.fshoes.core.admin.hoadon.model.respone;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class HDBillResponse {

    private Long id;

    private String code;

    private String fullName;

    private String phoneNumber;

    private String address;

    private BigDecimal totalMoney;

    private BigDecimal moneyReduced;

    private BigDecimal moneyAfter;

    private BigDecimal moneyShip;

    private Boolean type;

    private String note;

    private Long createdAt;

    private String createdBy;

    private Long totalProduct;

    private Integer status;


    public HDBillResponse(Long id, String code, String fullName, String phoneNumber, String address, BigDecimal totalMoney, BigDecimal moneyReduced, BigDecimal moneyAfter, BigDecimal moneyShip, Boolean type, String note, Long createdAt, String createdBy, Long totalProduct, Integer status) {
        this.id = id;
        this.code = code;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.totalMoney = totalMoney;
        this.moneyReduced = moneyReduced;
        this.moneyAfter = moneyAfter;
        this.moneyShip = moneyShip;
        this.type = type;
        this.note = note;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.totalProduct = totalProduct;
        this.status = status;
    }
}
