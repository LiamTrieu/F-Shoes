package com.fshoes.core.admin.hoadon.model.request;

import com.fshoes.core.common.PageableRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BillFilterRequest extends PageableRequest {

    private String startDate;

    private String endDate;

    private String status;

    private String type;

    private String inputSearch;

}
