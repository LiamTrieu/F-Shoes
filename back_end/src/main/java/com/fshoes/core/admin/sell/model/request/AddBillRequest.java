package com.fshoes.core.admin.sell.model.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class AddBillRequest {

    private String id;

    private String fullName;

    private String phoneNumber;

    private String address;

    private String note;

    private String idVourcher;

    private String idCustomer;


    private BigDecimal moneyShip;

    private BigDecimal moneyReduce;

    private BigDecimal moneyAfter;

    private BigDecimal totalMoney;

    private Integer type;





}
