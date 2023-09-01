package com.fshoes.core.admin.hoadon.model.request;

import com.fshoes.entity.Bill;
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
public class HDBillHistoryRequest {

    private Bill bill;

    private Integer idStaff;

    private String note;

}
