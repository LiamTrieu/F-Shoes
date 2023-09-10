package com.fshoes.core.admin.voucher.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdVoucherSearch {
    private String nameSearch;
    private Long startDateSearch;
    private Long endDateSearch;
    private Integer typeSearch;
    private Integer statusSearch;
}
