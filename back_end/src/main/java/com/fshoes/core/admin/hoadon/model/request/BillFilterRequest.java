package com.fshoes.core.admin.hoadon.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BillFilterRequest {

    private String inputSearch;

    private String startDate;

    private String endDate;

    private Integer status;

    private Integer type;

}
