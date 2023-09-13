package com.fshoes.core.admin.hoadon.model.request;

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
public class HDBillRequest {

    private String idVoucher;

    private String idCustomer;

    private String fullName;

    private String phoneNumber;

    private String address;

    private String note;

    private Integer status;

    private String noteBillHistory;

    private String idStaff;

}
