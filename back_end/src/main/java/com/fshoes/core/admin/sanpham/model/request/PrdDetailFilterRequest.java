package com.fshoes.core.admin.sanpham.model.request;

import com.fshoes.core.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PrdDetailFilterRequest extends PageableRequest {
    private String product;

    private String priceMin;

    private String priceMax;
}
