package com.fshoes.core.admin.hoadon.model.request;

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
public class HDBillDetailRequest {

    private Integer idProductDetail;

    private Integer idBill;

    private Integer quanity;

    private BigDecimal price;

    private Integer status;

}
