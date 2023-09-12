package com.fshoes.core.admin.hoadon.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillConfirmRequest {
    private Integer idVoucher;

    private Integer idCustomer;

    private String fullName;

    private String phoneNumber;

    private String address;

    private String note;

    private Integer status;

    private String noteBillHistory;

    private Integer idStaff;

    private List<HDBillDetailRequest> listHdctReq;

}
